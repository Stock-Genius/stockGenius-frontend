export const getMyItemsReducer = (state = {}, action) => {

  switch (action.type) {
    case 'GET_ITEMS_REQUEST':
      return {
        loading: true,
      }
    case 'GET_ITEMS_SUCCESS':
      return {
        loading: false,
        items: action.payload,
      }
    case 'GET_ITEMS_FAIL':
      return {
        loading: false,
        error: action.payload,
      }
    case 'ITEMS_LIST_RESET':
      return { items: [] }
    default:
      return state
  }
};


export const updateItemReducer = (state = {}, action) => {

  switch (action.type) {
    case 'UPDATE_ITEM_REQUEST':
      return {
        loading: true,
      }
    case 'UPDATE_ITEM_SUCCESS':
      return {
        loading: false,
        message: action.payload.message,
        success: action.payload.success
      }
    case 'UPDATE_ITEM_FAIL':
      return {
        message: "",
        loading: false,
        error: action.payload,
      }
    case 'UPDATE_ITEM_RESET':
      return state = {}
    default:
      return state
  }
};

// delete item reducer
export const deleteItemReducer = (state = {}, action) => {

  switch (action.type) {
    case 'ITEM_DELETE_REQUEST':
      return {
        loading: true,
      }
    case 'ITEM_DELETE_SUCCESS':
      return {
        loading: false,
        success: true,
        message: action.payload.message,
      }
    case 'ITEM_DELETE_FAIL':
      return {
        loading: false,
        error: action.payload,
      }
    case 'RESET_STATE':
      return state = {}
    default:
      return state
  }
};

// add new Item
export const addItemReducer = (state = {}, action) => {

  switch (action.type) {
    case 'ADD_ITEM_REQUEST':
      return {
        loading: true,
      }
    case 'ADD_ITEM_SUCCESS':
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message
      }
    case 'ADD_ITEM_FAIL':
      return {
        loading: false,
        success: false,
        error: action.payload,
      }
    case 'ADD_ITEM_RESET':
      return state = {}
    default:
      return state
  }
};

// sell item reducer
export const sellItemReducer = (state = {}, action) => {

  switch (action.type) {
    case 'ITEM_SELL_REQUEST':
      return {
        loading: true,
      }
    case 'ITEM_SELL_SUCCESS':
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message
      }
    case 'ITEM_SELL_FAIL':
      return {
        loading: false,
        success: false,
        error: action.payload,
      }
    case 'ITEM_SELL_RESET':
      return state = {}
    default:
      return state
  }
};


// get selling history reducer
export const getMySellItemsReducer = (state = {}, action) => {

  switch (action.type) {
    case 'GET_SELL_ITEM_REQUEST':
      return {
        loading: true,
      }
    case 'GET_SELL_ITEM_SUCCESS':
      return {
        loading: false,
        items: action.payload,
      }
    case 'GET_SELL_ITEM_FAIL':
      return {
        loading: false,
        error: action.payload,
      }
    case 'ITEMS_LIST_RESET':
      return { items: [] }
    default:
      return state
  }
};

// delete item by history
export const deleteSellItemReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HISTORY_DELETE_REQUEST':
      return { loading: true }
    case 'HISTORY_DELETE_SUCCESS':
      return { loading: false, success: true, message: 'Item removed successfully.' }
    case 'HISTORY_DELETE_FAIL':
      return { loading: false, error: action.payload }
    case 'HISTORY_DELETE_RESET':
      return {};
    default:
      return state
  }
};