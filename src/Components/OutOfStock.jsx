import React, { useState, useEffect } from 'react';
import { getItems } from '../actions/itemsAction';
import { useDispatch, useSelector } from 'react-redux';
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
            <p className="md:text-lg font-semibold m-4">'Update your stock and grow your business “😉”. Keep growing!'</p>
            <hr />
            {loading ? (<Loader />) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        {outOfStock && outOfStock.length !== 0 ? (
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
                            <p className="text-lg font-semibold m-4">Your stock is maintained ✨</p>
                        )}
                        <tbody>
                            {outOfStock && outOfStock.map((ele, i) => (
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