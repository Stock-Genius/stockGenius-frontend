import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userLoginReducer, userRegisterReducer, userListReducer, userDetailsReducer, userUpdateProfileReducer } from '../reducers/reducers';
import { thunk } from 'redux-thunk';

import { addItemReducer, getMyItemsReducer, deleteItemReducer, updateItemReducer, deleteSellItemReducer, sellItemReducer, getMySellItemsReducer } from '../reducers/itemReducers';


const rootReducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    addItem: addItemReducer,
    myItems: getMyItemsReducer,
    updateItem: updateItemReducer,
    deleteItem: deleteItemReducer,
    sellItem: sellItemReducer,
    sellHistory: getMySellItemsReducer,
    deleteSellItem: deleteSellItemReducer,
    userList: userListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
