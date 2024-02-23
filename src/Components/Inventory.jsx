import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from './Popup';
import { getItems } from '../actions/itemsAction';
import Loader from './Loader';
import Message from './Message';
import OutOfStock from './OutOfStock';


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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: userSuccess } = userLogin;

  const updateItem = useSelector((state) => state.updateItem);
  const { error: updateError, success, message } = updateItem;

  const deleteItem = useSelector((state) => state.deleteItem);
  const { error: deleteError, success: deleteSuccess, message: deleteMessage } = deleteItem;

  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfoFromStorage.token}`,
    },
  };
  useEffect(() => {
    dispatch(getItems(config))
  }, []);

  // useEffect(() => {
  //   dispatch(getItems());
  //   if (error || message || success || deleteSuccess || deleteMessage) {
  //     setAlertBox(true);
  //   };

  // }, [dispatch, activeTab, success, message, deleteSuccess, deleteMessage]);

  //popup handler
  const handlePopup = (e, ele, id) => {
    setSeletedProduct(ele)
    setProductIndex(id)
    setValue(e.target.value)
    setPopup(true)
  };

  //serching logic
  let searching = [];
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    searching = items ? items.filter((ele) => ele.name.toLowerCase().includes(search)) : []
    setSearchedData(searching)

    if (e.target.value === "") {
      setSearchedData("");
    };
  }

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
              message={message ? message : deleteMessage ? deleteMessage : (error || updateError || deleteError ? error : null)}
              setShowAlertBox={setAlertBox}
            />
          )}

          <h1 className="text-2xl font-semibold mb-4">Inventory</h1>
          <div className="flex mb-2">
            <button
              className={`px-4 py-2 mr-4 ${activeTab === 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'
                }`}
              onClick={() => handleTabChange(1)}
            >
              All
            </button>
            <button
              className={`px-4 py-2 mr-4 ${activeTab === 2 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'
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
                      className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
              {items ? (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                      {(items.length !== 0) || searchedData.length !== 0 ? (
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Product</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Stock</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Price</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Edit</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Delete</th>
                          </tr>
                        </thead>
                      ) : (
                        <p className="text-lg font-semibold m-4">Add your products and let the magic begin! ✨ #StartSelling</p>
                      )}
                      <tbody>
                        {items ? (
                          searchedData.length > 0 ? (
                            searchedData.map((ele, i) => (
                              <tr key={i} className="text-sm md:text-base hover:bg-gray-100 lowercase">
                                <td className="px-6 py-3 border-b text-center">{ele.name}</td>
                                <td className={`px-6 py-3 border-b text-center ${ele.qty === 0 && 'text-red-600 font-semibold'}`}>{ele.qty === 0 ? 'out of stock' : ele.qty}</td>
                                <td className="px-6 py-3 border-b text-center">{ele.sellPrice}</td>
                                <td className="px-6 py-3 border-b text-center">
                                  <button
                                    onClick={(e) => {
                                      handlePopup(e, ele, ele._id);
                                    }}
                                    value="edit"
                                    className="bg-gray-200 px-2.5 py-1.5 rounded-full hover:bg-primary text-primary hover:text-white"
                                  >
                                    <i className="fas fa-pencil pointer-events-none"></i>
                                  </button>
                                </td>
                                <td className="px-6 py-3 border-b text-center">
                                  <button
                                    onClick={(e) => {
                                      handlePopup(e, ele, ele._id);
                                    }}
                                    value="delete"
                                    className="bg-gray-200 px-2.5 py-1.5 rounded-full hover:bg-red-600 text-red-400 hover:text-white"
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
                                <tr key={i} className="hover:bg-gray-100 text-sm md:text-base lowercase">
                                  <td className="px-6 py-3 border-b text-center">{ele.name}</td>
                                  <td className={`px-6 py-3 border-b text-center ${ele.qty === 0 && 'text-red-600 font-semibold'}`}>{ele.qty === 0 ? 'out of stock' : ele.qty}</td>
                                  <td className="px-6 py-3 border-b text-center">{ele.sellPrice}</td>
                                  <td className="px-6 py-3 border-b text-center">
                                    <button
                                      onClick={(e) => {
                                        handlePopup(e, ele, ele._id);
                                      }}
                                      value="edit"
                                      className="bg-gray-200 px-2.5 py-1.5 rounded-full hover:bg-primary text-primary hover:text-white"
                                    >
                                      <i className="fas fa-pencil pointer-events-none"></i>
                                    </button>
                                  </td>
                                  <td className="px-6 py-3 border-b text-center">
                                    <button
                                      onClick={(e) => {
                                        handlePopup(e, ele, ele._id);
                                      }}
                                      value="delete"
                                      className="bg-gray-200 px-2.5 py-1.5 rounded-full hover:bg-red-600 text-red-400 hover:text-white"
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
                      <Popup
                        state={popup}
                        setPopup={setPopup}
                        popupValue={value}
                        selectedProduct={selectedProduct}
                        setUpdateProduct={setSeletedProduct}
                        productId={productIndex}
                      />
                    </table>
                  </div>
                </div>
              ) : loading ? (
                <div className="h-80 flex justify-center items-center">
                  <div class="spinner"></div>
                </div>
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