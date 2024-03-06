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

        const { data } = await axios.post(`${baseUrl}api/users`, obj, config);

        dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data.data });
        // localStorage.setItem('userInfo', JSON.stringify(data.data));

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

        const { data } = await axios.post(`${baseUrl}api/users/login`, obj, config);

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

// logout user 
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('stock');
    localStorage.removeItem('history');
    dispatch({ type: 'USER_LOGOUT' });
    dispatch({ type: 'RESET_STATE' });
    dispatch({ type: 'ITEMS_LIST_RESET' });
    document.location.href = '/';
};
