import axios from "axios";
import { logout } from "./action";

const baseUrl = "https://stockgenius-server.onrender.com";

// get all my items
export const getItems = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'GET_ITEMS_REQUEST',
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${baseUrl}/api/items`, config);

        dispatch({ type: 'GET_ITEMS_SUCCESS', payload: data.data });

        localStorage.setItem('stock', JSON.stringify(data.data));

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout());
        // }
        dispatch({
            type: 'GET_ITEMS_FAIL',
            payload: message,
        })
    }
};

// update single item
export const updateMyItem = (obj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'UPDATE_ITEM_REQUEST',
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`${baseUrl}/api/items/${obj._id}`, obj, config);

        dispatch({ type: 'UPDATE_ITEM_SUCCESS', payload: data })

        if (data.success) {
            localStorage.setItem('stock', JSON.stringify(data.data));
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: 'UPDATE_ITEM_FAIL',
            payload: message,
        })
    }
};

// delete single item
export const deleteMyItem = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ITEM_DELETE_REQUEST',
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.delete(`${baseUrl}/api/items/${id}`, config);

        dispatch({ type: 'ITEM_DELETE_SUCCESS', payload: data });

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: 'ITEM_DELETE_FAIL',
            payload: message,
        })
    }
};


// add single item
export const addMyItem = (obj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ADD_ITEM_REQUEST',
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${baseUrl}/api/items`, obj, config);

        dispatch({ type: 'ADD_ITEM_SUCCESS', payload: data })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: 'ADD_ITEM_FAIL',
            payload: message,
        })
    }
};


// sell product update and add into history
export const sellAndUpdate = (obj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ITEM_SELL_REQUEST',
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`${baseUrl}/api/items/sell/${obj._id}`, obj, config);

        dispatch({ type: 'ITEM_SELL_SUCCESS', payload: data })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: 'ITEM_SELL_FAIL',
            payload: message,
        })
    }
};


// get all selling history
export const mySellHistory = (config) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'GET_SELL_ITEM_REQUEST',
        });

        // const {
        //     userLogin: { userInfo },
        // } = getState();

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // };

        const { data } = await axios.get(`${baseUrl}/api/items/sell`, config);

        dispatch({ type: 'GET_SELL_ITEM_SUCCESS', payload: data.data });

        if (data.success) {
            localStorage.setItem('history', JSON.stringify(data.data));
        };
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: 'GET_SELL_ITEM_FAIL',
            payload: message,
        });
    };
};

// delete single item from history
export const deleteItemByHistory = (id) => async (dispatch, getState) => {
    console.log(id,'id in action');
    try {
        console.log('try block');
        dispatch({
            type: 'ITEM_DELETE_REQUEST',
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${baseUrl}/api/items/sell/${id}`, config)

        dispatch({
            type: 'ITEM_DELETE_SUCCESS',
        });
    } catch (error) {
        console.log('api/items/sell');
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: 'ITEM_DELETE_FAIL',
            payload: message,
        })
    }
};