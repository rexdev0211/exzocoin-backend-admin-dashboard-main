import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS, UPDATE_LOAD_USER,
  USER_DATA,
  USER_TOKEN_SET
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userSignUp = ({ email, password, name }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('auth/register', {
      email: email,
      password: password,
      name: name
    }
    ).then(({ data }) => {
      console.log("data:", data);
      if (data.result) {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common['authorization'] = "Bearer " + data.token;
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: USER_TOKEN_SET, payload: data.token });
        dispatch({ type: USER_DATA, payload: data.user });
      } else {
        console.log("payload: data.error", data.error);
        dispatch({ type: FETCH_ERROR, payload: "Network Error" });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
      console.log("Error****:", error.message);
    });
  }
};

export const userSignIn = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('api/v1/auth/login', {
      username: email,
      password: password,
    }
    ).then(({ data }) => {
      if (data) {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common['Authorization'] = "Bearer " + data.token;
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: USER_TOKEN_SET, payload: data.token });
        dispatch({ type: USER_DATA, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
      console.log("Error****:", error.message);
    });
  }
};

export const getUser = (token) => {
  return (dispatch) => {
    if (!token) {
      token = localStorage.getItem('token');
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    dispatch({ type: FETCH_START });
    axios.get('api/v1/auth/me',
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: USER_DATA, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: UPDATE_LOAD_USER, payload: false });
      console.log("Error****:", error.message);
    });
  }
};

export const userSignOut = () => {

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    localStorage.removeItem("token");
    dispatch({ type: SIGNOUT_USER_SUCCESS });
    dispatch({ type: FETCH_SUCCESS });
  }
};
