import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_USER_LIST_SUCCESS,
  GET_USER_BY_ID,
  UPDATE_USER,
  CREATE_USER,
  DELETE_USER,
  INIT_USER_ACTION_STATE,
} from 'constants/ActionTypes'
import axios from 'util/Api'

const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

export const getUserList = (type = 'user', startNo = 0, pageSize = 50) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`api/v1/users?type=${type}&startNo=${startNo}&pageSize=${pageSize}`)
    .then(({data}) => {
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: FETCH_USER_LIST_SUCCESS, payload: data.users});
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
}

export const initUserOpState = () => {
  return {
    type: INIT_USER_ACTION_STATE,
  }
}

export const changeVerification = (userid, usertype = 'user', status = true) => {
  return (dispatch) => {
    axios.get(`api/v1/users/verification/${userid}?status=${status}`)
    .then(({data}) => {
      console.log("data:", data);
      if (data.status == 1) {
        dispatch({type: FETCH_SUCCESS});
        dispatch(getUserList(usertype));
      }
      else
        dispatch({type: FETCH_ERROR, payload: 'Verification failed'});
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
}

export const getUserById = (userid) => {
  return (dispatch) => {
    axios.get(`api/v1/users/${userid}`)
    .then(({data}) => {
      if (data.user) {
        dispatch({type: GET_USER_BY_ID, payload: data.user});
      }
      else
        dispatch({type: FETCH_ERROR, payload: data.error});
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
}


export const updateUser = (id, body) => {
  return {
    type: UPDATE_USER,
    payload: {
      id,
      body,
    },
  }
}

export const createUser = (body) => {
  return {
    type: CREATE_USER,
    payload: {
      body,
    },
  }
}

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: id,
  }
}
