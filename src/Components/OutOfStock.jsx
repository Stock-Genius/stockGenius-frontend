import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Popup from './Popup';
import Loader from './Loader';

function OutOfStock() {
    const [outOfStock, setOOS] = useState([]);
    const [popup, setPopup] = useState(false);
    const [value, setValue] = useState("");
    const [selectedProduct, setSeletedProduct] = useState({});
    const [productId, setProductId] = useState(null);

    const myItems = useSelector((state) => state.myItems);
    const { items, loading, error } = myItems;

    const handleOutOfStock = () => {
        const outOfStockProducts = items ? items.filter((e) => parseInt(e.qty) === 0) : [];
        setOOS(outOfStockProducts);
    }

    useEffect(() => {
        handleOutOfStock();
    }, [productId, popup]);

    const handlePopup = (e, ele, id) => {
        setSeletedProduct(ele)
        setProductId(id)
        setValue(e.target.value)
        setPopup(true)
    };

    return (
        <>
            <p className="md:text-lg font-semibold m-4 dark:text-neutral-100">'Update your stock and grow your business “😉”. Keep growing!'</p>
            <hr />
            {loading ? (<Loader />) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:border-none border border-gray-300 dark:bg-third">
                        {outOfStock && outOfStock.length !== 0 ? (
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
                            <p className="text-lg font-semibold m-4 dark:text-neutral-100">Your stock is maintained ✨</p>
                        )}
                        <tbody className='dark:text-neutral-400'>
                            {outOfStock && outOfStock.map((ele, i) => (
                                <tr key={i} className="text-sm md:text-base border-b dark:border-secondary dark:hover:bg-secondary hover:bg-gray-100 capitalize">
                                   <td className="px-6 py-3 text-center sm:w-10 w-8 h-16 rounded-md overflow-hidden">
                                    <img src={ele.img ? ele.iimg : '/img/sample.jpg'} className='h-full w-full scale-125' alt="" />
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
                                            className="bg-gray-200 px-2.5 py-1.5 rounded-full dark:bg-main dark:hover:bg-primary hover:bg-red-600 text-red-400 hover:text-white"
                                        >
                                            <i className="fas fa-trash pointer-events-none"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <Popup
                            state={popup}
                            setPopup={setPopup}
                            popupValue={value}
                            selectedProduct={selectedProduct}
                            setUpdateProduct={setSeletedProduct}
                            productId={productId}
                        />
                    </table>
                </div>
            )}
        </>
    )
}

export default OutOfStock