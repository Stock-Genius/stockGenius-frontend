import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_PRODUCTION_URL;
// const baseUrl = process.env.REACT_APP_SERVER_DEVELOPEMENT_URL;

// register new user
export const register = (obj) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_REGISTER_REQUEST',
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(`${baseUrl}/api/users`, obj, config);

        dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data.data });

    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
};


// login existing user 
export const login = (obj) => async (dispatch) => {
    try {
        dispatch({ type: "USER_LOGIN_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const { data } = await axios.post(`${baseUrl}/api/users/login`, obj, config);

        dispatch({ type: "USER_LOGIN_SUCCESS", payload: data.data });

        localStorage.setItem('userInfo', JSON.stringify(data.data));

    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }
};


// Admin get all users
export const listUsers = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'USER_LIST_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`${baseUrl}/api/users`, config)
  
      dispatch({
        type: 'USER_LIST_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'USER_LIST_FAIL',
        payload: message,
      })
    }
}

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_DETAILS_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/api/users/profile`, config)

    dispatch({
      type: 'USER_DETAILS_SUCCESS',
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: 'USER_DETAILS_FAIL',
      payload: message,
    })
  }
}
  
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_UPDATE_PROFILE_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${baseUrl}/api/users/profile`, user, config)

    dispatch({
      type: 'USER_UPDATE_PROFILE_SUCCESS',
      payload: data,
    })
    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: 'USER_UPDATE_PROFILE_FAIL',
      payload: message,
    })
  }
}


  // logout user 
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('stock');
  localStorage.removeItem('history');
  dispatch({ type: 'USER_LOGOUT' });
  dispatch({ type: 'RESET_STATE' });
  dispatch({type: 'USER_DETAILS_RESET'});
  dispatch({ type: 'ITEMS_LIST_RESET' });
  dispatch({ type: 'USER_LIST_RESET' });
  document.location.href = '/login';
};