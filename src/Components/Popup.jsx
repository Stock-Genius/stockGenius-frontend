import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMyItem, deleteMyItem, deleteItemByHistory } from '../actions/itemsAction';
import axios from 'axios';
import Loader from './Loader';


const baseUrl = process.env.REACT_APP_SERVER_PRODUCTION_URL;
// const baseUrl = process.env.REACT_APP_SERVER_DEVELOPEMENT_URL;

function Popup({ state, setPopup, popupValue, selectedProduct, setUpdateProduct, productId }) {

    const dispatch = useDispatch();
    const [uploading, setUploading] = useState(false);

    const { name: productname, qty, buyPrice, sellPrice, img } = selectedProduct;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    const [profile, setProfile] = useState(userInfo ? userInfo : {});

    //close popup function
    const closePopup = () => {
        setPopup(false);
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("productImage", file);
        setUploading(true);
    
        try {
          const { data } = await axios.post(`${baseUrl}/api/upload/products`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setUploading(false);
          setUpdateProduct({ ...selectedProduct, img: data });
        } catch (error) {
          setUploading(false);
          console.error('Error uploading file:', error);
        }
      }

    //update product function
    const handleUpdate = () => {
        if (selectedProduct.buyPrice > selectedProduct.sellPrice) {
            alert(`sell price must greater than cost`);
        }
        else {
            dispatch(updateMyItem(selectedProduct));
            closePopup();
        }
    }

    //delete product function
    const handleDelete = () => {
        dispatch(deleteMyItem(productId));
        closePopup();
    }

    const handleHistoryItem = () => {
        dispatch(deleteItemByHistory(productId));
        closePopup();
    }

    // render the popup shown function
    const renderPopupContent = () => {
        switch (popupValue) {
            case 'delete':
                return (
                    <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
                        hello
                        <div aria-hidden="true" className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer">
                        </div>
                        <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                            <div
                                className="w-full py-2 dark:bg-secondary  bg-white cursor-default pointer-events-auto relative rounded-xl mx-auto max-w-sm">

                                <button onClick={closePopup} className="absolute top-2 right-2 rtl:right-auto rtl:left-2">
                                    <svg className="h-4 w-4 cursor-pointer text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                                <div className="space-y-2 p-2">
                                    <div className="p-4 space-y-2 text-center">
                                        <h2 className="dark:text-white capitalize text-xl font-bold tracking-tight" id="page-action.heading">
                                            Delete {productname}
                                        </h2>

                                        <p className="dark:text-zinc-300 text-gray-500">
                                            Are you sure you would like to do this?
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div aria-hidden="true" className="border-t dark:border-zinc-500 px-2"></div>

                                    <div className="px-6 py-2">
                                        <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                                            <button type="button"
                                                onClick={() => { setPopup(false) }}
                                                className="dark:bg-third dark:border-none dark:shadow-lg dark:text-zinc-300 inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600">
                                                <span className=" flex items-center gap-1">
                                                    <span>
                                                        Cancel
                                                    </span>
                                                </span>
                                            </button>

                                            <button type="submit"
                                                onClick={handleDelete}
                                                className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">

                                                <span className="flex items-center gap-1">
                                                    <span className="">
                                                        Confirm
                                                    </span>
                                                </span>

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 'history':
                return (
                    <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
                        <div aria-hidden="true" className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer">
                        </div>
                        <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                            <div
                                className="w-full py-2 dark:bg-secondary  bg-white cursor-default pointer-events-auto relative rounded-xl mx-auto max-w-md">

                                <button onClick={closePopup} className="absolute top-2 right-2 rtl:right-auto rtl:left-2">
                                    <svg className="h-4 w-4 cursor-pointer text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                                <div className="space-y-2 p-2">
                                    <div className="p-4 space-y-2 text-center">
                                        <h2 className="dark:text-white capitalize text-xl font-bold tracking-tight" id="page-action.heading">
                                            Delete {productname}
                                        </h2>

                                        <p className="dark:text-zinc-300 text-gray-500">
                                            Are you sure you would like to do this?
                                        </p>
                                        <p className='leading-1 mt-3 tracking-wide italic text-xs font-semibold text-red-400'>
                                            Note: this will no return in the stock. <br />
                                            It will be effect your profits and sales.</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div aria-hidden="true" className="border-t px-2"></div>

                                    <div className="px-6 py-2">
                                        <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                                            <button type="button"
                                                onClick={() => { setPopup(false) }}
                                                className="dark:bg-third dark:border-none dark:shadow-lg dark:text-zinc-300 inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600">
                                                <span className=" flex items-center gap-1">
                                                    <span>
                                                        Cancel
                                                    </span>
                                                </span>
                                            </button>

                                            <button type="submit"
                                                onClick={handleHistoryItem}
                                                className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">

                                                <span className="flex items-center gap-1">
                                                    <span className="">
                                                        Confirm
                                                    </span>
                                                </span>

                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                )
            case 'edit':
                return (
                    <>
                        <div className='flex justify-between items-center'>
                  <h1 className="md:text-3xl font-bold mt-8 mx-6 text-xl text-gray-800 dark:text-white">Update Product</h1>
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-6 mt-8">
                      <img
                        src={img ? img : "/img/product.jpg"}
                        alt="prodct"
                        className="w-full h-full object-cover"
                      />
                    </div>
                </div>
                        <hr className='my-4 mx-6' />
                        <div className="dark:bg-secondary rounded-sm max-w-screen-md mx-auto shadow-md mb-10 p-6 flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                <div className="mb-6">
                                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Enter product name"
                                        name="name"
                                        onChange={(e) => { setUpdateProduct((prev) => ({ ...prev, [e.target.name]: e.target.value })) }}
                                        value={productname}
                                        className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none dark:text-gray-300"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cost Price <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter Cost price"
                                        name="buyPrice"
                                        onChange={(e) => { setUpdateProduct((prev) => ({ ...prev, [e.target.name]: e.target.value })) }}
                                        value={buyPrice}
                                        className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none   dark:text-gray-300"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Selling Price <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter selling price"
                                        name="sellPrice"
                                        onChange={(e) => { setUpdateProduct((prev) => ({ ...prev, [e.target.name]: e.target.value })) }}
                                        value={sellPrice}
                                        className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none   dark:text-gray-300"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter quantity"
                                        name="qty"
                                        onChange={(e) => { setUpdateProduct((prev) => ({ ...prev, [e.target.name]: e.target.value })) }}
                                        value={qty}
                                        className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none   dark:text-gray-300"
                                    />
                                </div>
                                {uploading && <Loader />}
                                <div className="grid grid-cols-1 w-full py-3 mb-6">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-third hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <i className="fa-solid fa-cloud-arrow-up text-3xl mb-4 text-gray-500 dark:text-gray-400"></i>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload product image</span> or drag and drop </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">{img}</p>
                                        </div>
                                        <input id="dropzone-file" name='img' onChange={uploadFileHandler} type="file" accept="image/*" className="hidden" />
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={handleUpdate} className="bg-primary text-white px-8 py-3 rounded-md hover:bg-opacity-90 focus:outline-none focus:bg-opacity-90">Update Product</button>
                            </div>
                        </div>
                    </>


                )
            case 'profileEdit':
                return (
                    <div>
                        <h1 className="text-2xl font-semibold mb-4 text-center">Update Your Profile</h1>
                        <hr className="mb-4" />
                        <div className='flex justify-center items-center flex-col  mb-4'>
                            <div className="w-40 h-40 mb-4 rounded-full overflow-hidden border flex justify-center items-center">
                                <img
                                    // src={(userInfo && userInfo.img && !image) ? userInfo.img : image ? URL.createObjectURL(image) : './img/download.jpeg'}
                                    src='/img/user.jpeg'
                                    alt="profile img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                // onClick={() => { inputRef.current.click(); }}
                                onClick={() => { alert('Sorry!, This feature not supported write now.') }}
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                                Upload Image <i className="fa-solid fa-upload"></i>
                            </button>
                            {/* <input type="file" onChange={handleImageChange} className='hidden' ref={inputRef} /> */}
                        </div>
                        <hr className="mb-4" />
                        {/* Account Section */}
                        <div className="flex md:flex-row flex-col items-center mb-4">
                            <div className="flex md:flex-row flex-col items-center md:items-start md:pr-8 w-full justify-center gap-x-32">
                                <h2 className="text-xl text-center font-semibold mb-2 opacity-70">Account</h2>
                                <div>
                                    <div className="relative pb-4 w-full">
                                        <input
                                            // onChange={handleProfileChange}
                                            type="text"
                                            placeholder="Full Name"
                                            name="name"
                                            value={userInfo ? profile.name : ""}
                                            className="w-full p-2 pr-16 bg-gray-200 border rounded-lg"
                                        />
                                    </div>
                                    <div className="relative pb-4">
                                        <input
                                            // onChange={handleProfileChange}
                                            type="text"
                                            placeholder="Email Id"
                                            name="email"
                                            value={userInfo ? profile.email : ""}
                                            className="w-full p-2 bg-gray-200 border rounded-lg"
                                        />
                                    </div>
                                    <div className="relative pb-4">
                                        <input
                                            // onChange={handleProfileChange}
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={userInfo ? profile.password : ""}
                                            className="w-full p-2 bg-gray-200 border rounded-lg"
                                        />
                                    </div>
                                    <div className="relative pb-4">
                                        <input
                                            // onChange={handleProfileChange}
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confirm_pass"
                                            value={userInfo ? profile.confirm_pass : ""}
                                            className="w-full p-2 bg-gray-200 border rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        {/* Shop Details Section */}
                        <div className="flex md:flex-row flex-col items-center mb-4">
                            <div className="flex md:flex-row flex-col items-center md:items-start md:pr-8 w-full justify-center gap-x-32">
                                <h2 className="text-xl text-center font-semibold mb-2 opacity-70">Shop Details</h2>
                                <div>
                                    <div className="relative pb-4 w-full">
                                        <input
                                            // onChange={handleProfileChange}
                                            type="text"
                                            placeholder="Name"
                                            name="shopname"
                                            value={userInfo ? profile.shopname : ""}
                                            className="w-full p-2 pr-16 bg-gray-200 border rounded-lg"
                                        />
                                    </div>
                                    <div className="relative pb-4">
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            name="address"
                                            // onChange={handleProfileChange}
                                            value={userInfo ? profile.address : ""}
                                            className="w-full p-2 bg-gray-200 border rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="w-full flex flex-col justify-center items-center mt-8">
                                <button
                                    // onClick={submitProfileUpdate}
                                    className="bg-blue-500 text-white px-20 py-2 rounded-2xl hover:bg-blue-600">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>

                )

            default:
                return null;
        }
    }

    return (
        <div>
            {state && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                    <div
                        className="bg-white dark:bg-main max-h-[95%] overflow-auto scroll px-10 pt-2 pb-10 rounded-xl shadow-lg z-10 flex flex-col"
                        style={{ boxShadow: "0px 10px 40px 0px #8552E51A" }}>
                        <button
                            className="fixed cursor-pointer text-2xl text-gray-700 self-end -mr-6"
                            onClick={closePopup}> <i class="fa-solid fa-xmark"></i>
                        </button>
                        {renderPopupContent()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Popup;



