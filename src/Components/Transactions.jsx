import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from './Popup';
import moment from 'moment';
import { getItems, addMyItem, deleteItemByHistory } from '../actions/itemsAction';
import Loader from './Loader';
import Message from './Message';
import { sellAndUpdate, mySellHistory } from '../actions/itemsAction';



const initial = {
  name: "",
  buyPrice: "",
  sellPrice: "",
  qty: "",
  img: "",
  brand: ""
};

function Transactions() {

  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const [alertBox, setAlertBox] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState({});
  const [popup, setPopup] = useState(false);
  const [value, setValue] = useState("");
  const [newMessage, setNewMessage] = useState('');
  const [uploading, setUploading] = useState(false)


  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const [values, setValues] = useState(initial);

  const { name, buyPrice, sellPrice, qty, img, brand } = values;

  console.log(values);

  const handleBuyProductValue = (e) => {
    setValues({
      ...values, [e.target.name]: e.target.value,
    })
  };


  const { success, message, error } = useSelector((state) => state.addItem);

  const handleSubmit = () => {

    if (parseInt(sellPrice) <= parseInt(buyPrice)) {
      setNewMessage('Sell price must be greater then buying');
      setAlertBox(true);
    }
    else {
      dispatch(addMyItem(values));
      setAlertBox(true);
      setValues(initial);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload/products', formData, config);
      setValues({
        ...values, img: data
      });
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }



  /**
  |--------------------------------------------------
  | Selling tab script start here
  |--------------------------------------------------
  */

  const [selectedProduct, setSelectedProduct] = useState(initial);
  const [productIndex, setProductIndex] = useState("");


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
    dispatch(getItems(config));
    dispatch(mySellHistory(config));
  }, [activeTab]);

  const myItems = useSelector((state) => state.myItems);
  const { items, loading, error: itemsError } = myItems;

  const sellItem = useSelector((state) => state.sellItem);
  const { error: sellError, success: sellSuccess, message: sellMessage } = sellItem;

  const updateSellingProduct = () => {
    if (selectedProduct) {
      dispatch(sellAndUpdate(selectedProduct));
      setAlertBox(true);
      setSelectedProduct(initial);
    };
  };

  const handleSellingProduct = (e) => {
    const findProduct = items?.find(
      (product) => product.name === (e.target.value !== '' ? e.target.value : initial));
    setSelectedProduct(findProduct);
  };

  /**
  |--------------------------------------------------
  | historay tab and also date filter logic starts here
  |--------------------------------------------------
  */

  const { items: itemsHistory, loading: historyLoading, error: historyError } = useSelector((state) => state.sellHistory);

  const [selectedFromDate, setSelectedFromDate] = useState(moment().subtract(1, 'days').format('YYYY-MM-DD'));
  const [selectedToDate, setSelectedToDate] = useState(moment().format('YYYY-MM-DD'));
  const [filteredData, setFilteredData] = useState([]);

  const handleFromDateChange = (e) => {
    const fromDate = e.target.value;
    setSelectedFromDate(fromDate);
    filterHistory(selectedFromDate, fromDate);
  };

  const handleToDateChange = (e) => {
    const toDate = e.target.value;
    setSelectedToDate(toDate);
    filterHistory(selectedFromDate, toDate);
  };

  const filterHistory = (fromDate, toDate) => {
    const fromDateObj = moment(fromDate, 'YYYY-MM-DD');
    const toDateObj = moment(toDate, 'YYYY-MM-DD').endOf('day')

    const filtered = itemsHistory?.filter(ele =>
      moment(ele.date.split('T')[0], 'YYYY-MM-DD').isBetween(fromDateObj, toDateObj, null, '[]')
    ) || [];
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterHistory(selectedFromDate, selectedToDate);
  }, [selectedFromDate, activeTab, selectedToDate]);


  // change date format
  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();

    const formattedDate = `${day < 10 ? '0' + day : day}, ${month} ${year}`;

    return formattedDate;
  }

  /**
  |--------------------------------------------------
  | history logic starts here
  |--------------------------------------------------
  */

  const deleteSellItem = useSelector((state) => state.deleteSellItem);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError, message: deleteMessage } = deleteSellItem;

  useEffect(() => {
    if (deleteMessage || deleteSuccess || deleteError) {
      setAlertBox(true);
    }
  }, [deleteSellItem]);

  const profits = itemsHistory ? filteredData.map((transaction) => {
    const buyPrice = parseFloat(transaction.buyPrice);
    const sellPrice = parseFloat(transaction.sellPrice);
    const qty = parseInt(transaction.qty);

    return (sellPrice - buyPrice) * qty;
  }) : [];

  const totalProfit = profits.reduce((sum, profit) => sum + profit, 0);

  const Sales = itemsHistory ? filteredData.map((transaction) => {
    const sellPrice = parseFloat(transaction.sellPrice);
    const qty = parseInt(transaction.qty);

    return sellPrice * qty;
  }) : [];

  const totalSale = Sales.reduce((sum, sale) => sum + sale, 0);

  //delete popup handler
  const handlePopup = (e, ele, i) => {
    setSelectedHistory(ele)
    setProductIndex(i);
    setValue(e.target.value)
    setPopup(true)
  };

  return (
    <>
      {historyLoading || deleteLoading || loading ? (<Loader />) :
        (
          <div className="container mx-auto mt-8">
            {alertBox && (
              <Message
                success={success || deleteSuccess || sellSuccess ? true : (error ? false : false)}
                message={message ? message : sellMessage ? sellMessage : deleteMessage ? deleteMessage : newMessage ? newMessage : (error ? error : itemsError ? itemsError : sellError ? sellError : historyError ? historyError : deleteError ? deleteError : null)}
                setShowAlertBox={setAlertBox}
              />
            )}
            <div className="flex px-6">
              <button
                className={`px-4 py-2 relative after:transition-all hover:after:left-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute  z-20 after:top-0 hover:text-neutral-100 dark:text-neutral-100 dark:bg-third after:-z-10 mr-4 bg-gray-300 text-gray-700 overflow-hidden ${activeTab === 1 ? 'bg-primary text-white after:left-0' : 'after:-left-full'
                  }`}
                onClick={() => handleTabChange(1)}
              >
                Add Stock
              </button>
              <button
                className={`px-4 py-2 relative after:transition-all hover:after:left-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute  z-20 after:top-0 hover:text-neutral-100 dark:text-neutral-100 dark:bg-third after:-z-10 mr-4 bg-gray-300 text-gray-700 overflow-hidden ${activeTab === 2 ? 'bg-primary text-white after:left-0' : 'after:-left-full'
                  }`}
                onClick={() => handleTabChange(2)}
              >
                Sell
              </button>
              <button
                className={`px-4 py-2 relative after:transition-all hover:after:left-0 after:h-full after:w-full after:content-[""] after:bg-primary after:absolute  z-20 after:top-0 hover:text-neutral-100 dark:text-neutral-100 dark:bg-third after:-z-10 mr-4 bg-gray-300 text-gray-700 overflow-hidden ${activeTab === 3 ? 'bg-primary text-white after:left-0' : 'after:-left-full'
                  }`}
                onClick={() => handleTabChange(3)}
              >
                History
              </button>

            </div>

            {activeTab === 1 && (
              <>
                <h1 className="md:text-3xl font-bold mt-8 mx-6 text-xl text-gray-800 dark:text-white">Create Product</h1>
                <hr className='my-4 mx-6' />
                <div className="mx-auto shadow-md flex flex-wrap justify-between rounded-lg overflow-hidden mb-10">
                  <div className="p-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                      <div className="mb-6">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          placeholder="Enter product name"
                          name="name"
                          value={name}
                          onChange={handleBuyProductValue}
                          className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none dark:text-gray-300"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          placeholder="Enter brand name"
                          name="brand"
                          value={brand}
                          onChange={handleBuyProductValue}
                          className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none dark:text-gray-300"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Buying Price <span className="text-red-500">*</span></label>
                        <input
                          type="number"
                          placeholder="Enter buying price"
                          name="buyPrice"
                          value={buyPrice}
                          onChange={handleBuyProductValue}
                          className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none   dark:text-gray-300"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Selling Price <span className="text-red-500">*</span></label>
                        <input
                          type="number"
                          placeholder="Enter selling price"
                          name="sellPrice"
                          value={sellPrice}
                          onChange={handleBuyProductValue}
                          className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none   dark:text-gray-300"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity <span className="text-red-500">*</span></label>
                        <input
                          type="number"
                          placeholder="Enter quantity"
                          name="qty"
                          value={qty}
                          onChange={handleBuyProductValue}
                          className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none   dark:text-gray-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 w-full py-3 mb-6">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-third hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload product image</span> or drag and drop </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" name='img' value={img} custom onChange={uploadFileHandler} type="file" className="hidden" />
                      </label>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={handleSubmit} className="bg-primary text-white px-8 py-3 rounded-md hover:bg-opacity-90 focus:outline-none focus:bg-opacity-90">Submit Product</button>
                    </div>
                  </div>
                  {uploading && <Loader />}
                </div>
              </>

            )}

            {activeTab === 2 && (
              <>
                <h1 className="md:text-3xl font-bold mt-8 mx-6 text-xl text-gray-800 dark:text-white">Sell Items</h1>
                <hr className='my-4 mx-6' />
                <div className="mx-auto shadow-md rounded-lg overflow-hidden mb-10">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="mb-6">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select an item <span className="text-red-500">*</span></label>
                        <select
                          name='name'
                          value={selectedProduct?.name || ''}
                          onChange={(e) => {
                            handleSellingProduct(e)
                          }}
                          className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none dark:text-gray-300"
                        >
                          <option selected>
                            example item
                          </option>
                          {items?.map((ele, i) => (
                            <option key={i} value={ele.name}>
                              {ele.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Selling Price <span className="text-red-500">*</span></label>
                        <input
                          type="number"
                          value={selectedProduct?.sellPrice}
                          placeholder="100"
                          onChange={(e) => setSelectedProduct((prev) => ((
                            { ...prev, [e.target.name]: e.target.value }
                          )))}
                          name="sellPrice"
                          className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none   dark:text-gray-300"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity <span className="text-red-500">*</span></label>
                        <select
                          value={selectedProduct?.qty}
                          name='qty'
                          onChange={(e) => setSelectedProduct((prev) => ((
                            { ...prev, [e.target.name]: e.target.value }
                          )))}
                          className={`mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none   dark:text-gray-300`}
                        >
                          {selectedProduct?.qty > 0 ? (
                            [...Array(parseFloat(selectedProduct?.qty)).keys()].map((ele) => (
                              <option key={ele + 1} value={ele + 1}>
                                {ele + 1}
                              </option>
                            ))
                          ) : (
                            <option value='0'>
                              0
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button disabled={selectedProduct?.name == 'example item' && '' ? true : false} onClick={updateSellingProduct} className="bg-primary text-white px-8 py-3 rounded-md hover:bg-opacity-90 focus:outline-none focus:bg-opacity-90">Sell</button>
                    </div>
                  </div>
                </div>
              </>

            )}

            {activeTab === 3 && (
              <div className='mx-6'>
                <div className="my-4 w-full">
                  <div className="flex gap-4">
                    <label htmlFor="fromDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      From Date
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      value={selectedFromDate}
                      onChange={handleFromDateChange}
                      className="p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-third dark:border-gray-600 dark:text-gray-300"
                    />

                    <label htmlFor="toDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      To Date
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      value={selectedToDate}
                      onChange={handleToDateChange}
                      className="p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-third dark:border-gray-600 dark:text-gray-300"
                    />
                  </div>

                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border dark:border-none border-gray-300 dark:bg-third">
                    {(itemsHistory && itemsHistory.length !== 0 && filteredData.length !== 0) ? (
                      <>
                        <thead className="dark:text-white text-gray-700 dark:bg-secondary border-neutral-600 bg-gray-200">
                          <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Quantity</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Profit</th>
                            <th className="px-6 py-3">Delete</th>
                          </tr>
                        </thead>
                        <tbody className="dark:text-neutral-400">
                          {filteredData.map((ele, i) => (
                            <tr key={i} className="text-sm md:text-base border-b dark:border-secondary dark:border-b dark:hover:bg-secondary hover:bg-gray-100">
                              <td className="px-6 py-4 text-center">{formatDate(ele.date)}</td>
                              <td className="px-6 py-4 text-center">{ele.name}</td>
                              <td className="px-6 py-4 text-center">{ele.qty}</td>
                              <td className="px-6 py-4 text-center">{ele.sellPrice}</td>
                              <td className="px-6 py-4 text-center">{(ele.sellPrice - ele.buyPrice) * ele.qty}</td>
                              <td className="px-6 py-3 text-center">
                                <button
                                  onClick={(e) => {
                                    handlePopup(e, ele, ele._id);
                                  }}
                                  value="history"
                                  className="bg-gray-200 dark:bg-main dark:hover:bg-primary px-2.5 py-1.5 rounded-full hover:bg-primary text-primary hover:text-white"
                                >
                                  <i className="fas fa-trash pointer-events-none"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    ) : (itemsHistory && itemsHistory.length === 0) || (itemsHistory == []) ? (
                      <tbody>
                        <tr>
                          <td colSpan="6" className="text-lg font-semibold m-4 dark:text-neutral-100">No selling history available of this day. #StartSelling!</td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="6" className="text-lg font-semibold m-4 dark:text-neutral-100">No selling history available of this day. #StartSelling!</td>
                        </tr>
                      </tbody>
                    )}
                  </table>

                  <Popup
                    state={popup}
                    setPopup={setPopup}
                    popupValue={value}
                    selectedProduct={selectedHistory}
                    setUpdateProduct={setSelectedHistory}
                    productId={productIndex} />
                </div>
                <div className='stcky bottom-0 bg-primary text-white my-3 flex md:flex-row flex-col md:justify-end'>
                  <h3 className='text-xl m-2 capitalize border-b flex justify-between'>Total sale:&nbsp; <strong>{totalSale}</strong></h3>
                  <h3 className='text-xl m-2 capitalize flex justify-between border-b'>Total profit:&nbsp; <strong>{totalProfit}</strong></h3>
                </div>
              </div>
            )}
          </div>
        )}
    </>
  );
}

export default Transactions;