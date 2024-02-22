import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServerError from './ServerError';
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
  qty: ""
};

function Transactions() {

  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const [alertBox, setAlertBox] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState({});
  const [popup, setPopup] = useState(false);
  const [value, setValue] = useState("");
  const [newMessage, setNewMessage] = useState('');

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const [values, setValues] = useState(initial);

  const { name, buyPrice, sellPrice, qty } = values;

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


  /**
  |--------------------------------------------------
  | Selling tab script start here
  |--------------------------------------------------
  */

  const [selectedProduct, setSelectedProduct] = useState(initial);
  const [productIndex, setProductIndex] = useState("");

  useEffect(() => {
    dispatch(getItems());
    dispatch(mySellHistory());
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
  }, [selectedFromDate, activeTab,selectedToDate]);


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

  useEffect(()=>{
    if(deleteMessage || deleteSuccess || deleteError){
      setAlertBox(true);
    }
  },[deleteSellItem]);

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

  console.log(deleteError,'id are here');

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
            <div className="flex">
              <button
                className={`px-4 py-2 mr-4 ${activeTab === 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                onClick={() => handleTabChange(1)}
              >
                Add Stock
              </button>
              <button
                className={`px-4 py-2 mr-4 ${activeTab === 2 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                onClick={() => handleTabChange(2)}
              >
                Sell
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 3 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                onClick={() => handleTabChange(3)}
              >
                History
              </button>

            </div>

            {activeTab === 1 && (
              <>
                <h1 className="text-2xl font-semibold mt-6 md:m-4 text-center border-b-2 pb-2">Add Items</h1>
                <div>
                  <div className="flex mb-4 py-6 md:p-12">
                    <div className="flex-col md:flex-row flex pr-8 w-full justify-center gap-x-32">
                      <h2 className="text-xl font-semibold mb-6 md:mb-2 ml-4 opacity-70 text-center">Item details</h2>
                      <div className='ml-8'>
                        <div className=" relative pb-3 w-full">
                          <label className='text-sm opacity-80 italic lowercase'><span className='text-red-500'>*</span>Product name</label>
                          <input
                            type="text"
                            placeholder="example etc."
                            name="name"
                            onChange={handleBuyProductValue}
                            value={name}
                            className="mt-1 w-full p-2 pr-16 bg-gray-200 border rounded-lg"
                          />
                        </div>
                        <div className=" relative pb-3">
                          <label className='text-sm opacity-80 italic lowercase'><span className='text-red-500'>*</span>Buying price</label>
                          <input
                            type="number"
                            placeholder="100"
                            name="buyPrice"
                            onChange={handleBuyProductValue}
                            value={buyPrice}
                            className="mt-1 w-full p-2 bg-gray-200 border rounded-lg"
                          />
                        </div>
                        <div className=" relative pb-3">
                          <label className='text-sm opacity-80 italic lowercase'><span className='text-red-500'>*</span>Selling price</label>
                          <input
                            type="number"
                            placeholder="150"
                            name="sellPrice"
                            onChange={handleBuyProductValue}
                            value={sellPrice}
                            className="mt-1 w-full p-2 bg-gray-200 border rounded-lg"
                          />
                        </div>
                        <div className=" relative pb-3">
                          <label className='text-sm opacity-80 italic lowercase'><span className='text-red-500'>*</span>no. of Quantity</label>
                          <input
                            type="number"
                            placeholder="6"
                            name="qty"
                            onChange={handleBuyProductValue}
                            value={qty}
                            className="mt-1 w-full p-2 bg-gray-200 border rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center mt-8">
                    <button onClick={handleSubmit} className="bg-primary text-white px-20 py-2 rounded-2xl hover:opacity-90 ">
                      Add
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 2 && (
              <>
                <h1 className="text-2xl font-semibold mt-6 md:m-4 text-center border-b-2 pb-2">Sell Items</h1>
                <div>
                  <div className="flex mb-4 py-6 md:p-12">
                    <div className="flex-col md:flex-row flex pr-8 w-full justify-center gap-x-32">
                      <h2 className="text-xl font-semibold mb-6 md:mb-2 ml-4 opacity-70 text-center">Item Details</h2>
                      <div className='ml-8'>
                        <div className="mb-4 w-full">
                          <label className='text-sm opacity-80 italic lowercase'><span className='text-red-500'>*</span>Select an item</label>
                          <select
                            // id="products"
                            name='name'
                            value={selectedProduct?.name || ''}
                            onChange={(e) => {
                              handleSellingProduct(e)
                            }}
                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                        <div className="mb-4">
                          <label className='text-sm opacity-80 italic lowercase'><span className='text-red-500'>*</span>selling price</label>
                          <input
                            type="number"
                            value={selectedProduct?.sellPrice}
                            placeholder="100"
                            onChange={(e) => setSelectedProduct((prev) => ((
                              { ...prev, [e.target.name]: e.target.value }
                            )))}
                            name="sellPrice"
                            className="w-full p-2 bg-gray-200 border rounded-lg"
                          />
                        </div>
                        <div className="mb-4">

                          <label className='text-sm opacity-80 italic lowercase'><span className='text-red-500'>*</span>no. of quantity</label>
                          <select
                            value={selectedProduct?.qty}
                            name='qty'
                            onChange={(e) => setSelectedProduct((prev) => ((
                              { ...prev, [e.target.name]: e.target.value }
                            )))}
                            className={`bg-gray-200 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${selectedProduct?.qty === 0 && selectedProduct?.qty !== "" ? 'text-red-500' : 'text-gray-800'}`}>
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
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center mt-8">
                    <button disabled={selectedProduct?.name == 'example item' && '' ? true : false} onClick={updateSellingProduct} className="bg-primary text-white px-20 py-2 rounded-2xl hover:opacity-90 ">
                      Sell
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 3 && (
              <>
                <div className="my-4 w-full">
                  <div className="flex gap-4">
                    <label htmlFor="fromDate" className="block mb-2 text-sm font-medium text-gray-900 ">
                      From Date
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      value={selectedFromDate}
                      onChange={handleFromDateChange}
                      className="p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                    />

                    <label htmlFor="toDate" className="block mb-2 text-sm font-medium text-gray-900 ">
                      To Date
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      value={selectedToDate}
                      onChange={handleToDateChange}
                      className="p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    {itemsHistory && itemsHistory.length !== 0 && filteredData.length !== 0 ? (
                      <>
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Date</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Product</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Quantity</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Price</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Profit</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.length !== 0 ? filteredData.map((ele, i) => (
                            <tr key={i} className="hover:bg-gray-100 text-sm md:text-base">
                              <td className="px-6 py-4 border-b text-center">{formatDate(ele.date)}</td>
                              <td className="px-6 py-4 border-b text-center">{ele.name}</td>
                              <td className="px-6 py-4 border-b text-center">{ele.qty}</td>
                              <td className="px-6 py-4 border-b text-center">{ele.sellPrice}</td>
                              <td className="px-6 py-4 border-b text-center">{(ele.sellPrice - ele.buyPrice) * ele.qty}</td>
                              <td className="px-6 py-3 border-b text-center">
                                <button
                                  onClick={(e) => {
                                    handlePopup(e, ele, ele._id);
                                  }}
                                  value="history"
                                  className="bg-gray-200 px-2.5 py-1.5 rounded-full hover:bg-red-600 text-red-400 hover:text-white"
                                >
                                  <i className="fas fa-trash pointer-events-none"></i>
                                </button>
                              </td>
                            </tr>
                          )) : (
                            <>
                              <p className='py-3'>No records has been added yet.</p>
                            </>
                          )}
                        </tbody>
                      </>
                    ) : (itemsHistory && itemsHistory.length === 0) || (itemsHistory == []) ? (
                      <p className="text-lg font-semibold m-4">'No selling history available of this day. #StartSelling!'</p>
                    ) : (
                      <p className="text-lg font-semibold m-4">'No selling history available of this day. #StartSelling!'</p>
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
                <div className='bg-[#4796BD] text-white my-3 flex md:flex-row flex-col md:justify-end'>
                  <h3 className='text-xl m-2 capitalize border-b flex justify-between'>Total sale:&nbsp; <strong>{totalSale}</strong></h3>
                  <h3 className='text-xl m-2 capitalize flex justify-between border-b'>Total profit:&nbsp; <strong>{totalProfit}</strong></h3>
                </div>
              </>
            )}
          </div>
        )}
    </>
  );
}

export default Transactions;
