import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import { getItems } from "../actions/itemsAction";
import Loader from "./Loader";
import Message from "./Message";
import OutOfStock from "./OutOfStock";
import ServerError from "./ServerError";


function Inventory() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState("");
  const [popup, setPopup] = useState(false);
  const [value, setValue] = useState("");
  const [selectedProduct, setSeletedProduct] = useState({});
  const [productIndex, setProductIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [alertBox, setAlertBox] = useState(false);

  const myItems = useSelector((state) => state.myItems);
  const { items, loading, error } = myItems;

  const updateItem = useSelector((state) => state.updateItem);
  const { error: updateError, success, message } = updateItem;

  const deleteItem = useSelector((state) => state.deleteItem);
  const {
    error: deleteError,
    success: deleteSuccess,
    message: deleteMessage,
  } = deleteItem;

  const userInfo = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      dispatch(getItems());
    }
    if (error || message || success || deleteSuccess || deleteMessage) {
      setAlertBox(true);
    }
  }, [dispatch, userInfo, activeTab, success, message, deleteSuccess, deleteMessage]);

  useEffect(() => {
    dispatch({ type: "UPDATE_ITEM_RESET" });
    setAlertBox(false);
  }, [activeTab])

  //popup handler
  const handlePopup = (e, ele, id) => {
    setSeletedProduct(ele);
    setProductIndex(id);
    setValue(e.target.value);
    setPopup(true);
  };

  //serching logic
  let searching = [];
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    searching = items
      ? items.filter((ele) => ele.name.toLowerCase().includes(search))
      : [];
    setSearchedData(searching);

    if (e.target.value === "") {
      setSearchedData("");
    }
  };

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <>

      {loading ? (
        <Loader />
      ) : (
        <div className="p-6">
          {alertBox && (
            <Message
              success={success ? true : (error || updateError || deleteError || deleteSuccess ? false : null)}
              message={message ? message : deleteMessage ? deleteMessage : (error || updateError || deleteError ? error : error)}
              setShowAlertBox={setAlertBox}
            />
          )}

          <h1 className="text-2xl font-semibold mb-4 dark:text-neutral-100">Inventory</h1>
          <div className="flex mb-2">
            <button
              className={`px-4 py-2 relative after:transition-all hover:after:left-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute  z-20 after:top-0 hover:text-neutral-100 dark:text-neutral-100 dark:bg-third after:-z-10 mr-4 bg-gray-300 text-gray-700 overflow-hidden ${activeTab === 1 ? 'bg-primary text-white after:left-0' : 'after:-left-full'
                }`}
              onClick={() => handleTabChange(1)}
            >
              All
            </button>
            <button
              className={`px-4 py-2 relative after:transition-all hover:after:left-0 after:h-full after:w-full after:content-[""] after:bg-red-500 after:absolute  z-20 after:top-0 hover:text-neutral-100 dark:text-neutral-100 dark:bg-third after:-z-10 mr-4 bg-gray-300 text-gray-700 overflow-hidden ${activeTab === 2 ? 'bg-red-500 text-white after:left-0' : 'after:-left-full'
                }`}
              onClick={() => handleTabChange(2)}
            >
              Out Of Stock
            </button>
          </div>

          {activeTab === 1 && (
            <>
              <div className="mb-3">
                <div className="md:w-64">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                      type="search"
                      value={search}
                      onChange={handleSearch}
                      className="dark:bg-third dark:outline-none dark:text-neutral-300 dark:border-none relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
              <div className="">
              {error && error === 'Request failed with status code 404' || error === 'Network Error' &&
                (
                  <ServerError error={error} />
                )}
              </div>
              {items ? (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:border-none border border-gray-300 dark:bg-third">
                      {(items.length !== 0) || searchedData.length !== 0 ? (
                        <thead className='dark:text-white text-gray-700 dark:bg-secondary border-neutral-600 bg-gray-200'>
                          <tr>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Stock</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Edit</th>
                            <th className="px-6 py-3">Delete</th>
                          </tr>
                        </thead>
                      ) : (
                        <p className="text-lg font-semibold m-4">Add your products and let the magic begin! ✨ #StartSelling</p>
                      )}
                      <tbody className='dark:text-neutral-400'>
                        {items ? (
                          searchedData.length > 0 ? (
                            searchedData.map((ele, i) => (
                              <tr key={i} className="text-sm md:text-base border-b dark:border-secondary dark:border-b dark:hover:bg-secondary hover:bg-gray-100 capitalize">
                                <td className="px-6 py-3 text-center sm:w-10 w-8 h-16 rounded-md overflow-hidden">
                                  <img src={ele.img ? ele.img : '/img/sample.jpg'} className='h-full w-full scale-125' alt="" />
                                </td>
                                <td className="px-6 py-3 text-center">{ele.name}</td>
                                <td className={`px-6 py-3 text-center ${ele.qty == 0 && 'text-red-600 font-semibold'}`}>{ele.qty == 0 ? 'out of stock' : ele.qty}</td>
                                <td className="px-6 py-3 text-center">{ele.sellPrice}</td>
                                <td className="px-6 py-3 text-center">
                                  <button
                                    onClick={(e) => {
                                      handlePopup(e, ele, ele._id);
                                    }}
                                    value="edit"
                                    className="bg-gray-200 dark:bg-main dark:hover:bg-primary px-2.5 py-1.5 rounded-full hover:bg-primary text-primary hover:text-white"
                                  >
                                    <i className="fas fa-pencil pointer-events-none"></i>
                                  </button>
                                </td>
                                <td className="px-6 py-3 text-center">
                                  <button
                                    onClick={(e) => {
                                      handlePopup(e, ele, ele._id);
                                    }}
                                    value="delete"
                                    className="bg-gray-200 dark:bg-main hover:bg-red-500 px-2.5 py-1.5 rounded-full dark:hover:bg-red-500 text-red-500 hover:text-white"
                                  >
                                    <i className="fas fa-trash pointer-events-none"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            searchedData?.length === 0 && search ? (
                              <tr>
                                <td colSpan="5" className="text-lg font-semibold m-4 md:text-center md:m-4 md:tracking-wider text-red-500">Product Not Found...</td>
                              </tr>
                            ) : (
                              items.map((ele, i) => (
                                <tr key={i} className="text-sm md:text-base border-b dark:border-secondary dark:border-b dark:hover:bg-secondary hover:bg-gray-100 capitalize">
                                  <td className="px-6 py-3 text-center sm:w-10 w-8 h-16 rounded-md overflow-hidden">
                                    <img src={ele.img ? ele.img : '/img/sample.jpg'} className='h-full w-full scale-125' alt="" />
                                  </td>
                                  <td className="px-6 py-3 text-center">{ele.name}</td>
                                  <td className={`px-6 py-3 text-center ${ele.qty == 0 && 'text-red-600 font-semibold'}`}>{ele.qty == 0 ? 'out of stock' : ele.qty}</td>
                                  <td className="px-6 py-3 text-center">{ele.sellPrice}</td>
                                  <td className="px-6 py-3 text-center">
                                    <button
                                      onClick={(e) => {
                                        handlePopup(e, ele, ele._id);
                                      }}
                                      value="edit"
                                      className="bg-gray-200 dark:bg-main dark:hover:bg-primary px-2.5 py-1.5 rounded-full hover:bg-primary text-primary hover:text-white"
                                    >
                                      <i className="fas fa-pencil pointer-events-none"></i>
                                    </button>
                                  </td>
                                  <td className="px-6 py-3 text-center">
                                    <button
                                      onClick={(e) => {
                                        handlePopup(e, ele, ele._id);
                                      }}
                                      value="delete"
                                      className="bg-gray-200 dark:bg-main hover:bg-red-500 px-2.5 py-1.5 rounded-full dark:hover:bg-red-500 text-red-500 hover:text-white"
                                    >
                                      <i className="fas fa-trash pointer-events-none"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )
                          )
                        ) : null}
                      </tbody>
                    </table>
                    <Popup
                      state={popup}
                      setPopup={setPopup}
                      popupValue={value}
                      selectedProduct={selectedProduct}
                      setUpdateProduct={setSeletedProduct}
                      productId={productIndex}
                    />
                  </div>
                </div>
              ) : loading ? (
                <Loader />
              ) : null}
            </>
          )}

          {activeTab === 2 && (
            <OutOfStock />
          )}
        </div>
      )}
    </>
  );
};

export default Inventory;