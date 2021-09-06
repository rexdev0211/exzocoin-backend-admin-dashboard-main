import {
  GET_USER_LIST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_FAILED,
  OPERATION_USER_SUCCESS,
  OPERATION_USER_FAILED,
  GET_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  INIT_USER_ACTION_STATE,
  SIGNOUT_USER_SUCCESS,
} from '../../constants/ActionTypes'

const initialState = {
  loader: false,
  userList: null,
  errorMessage: '',
  opErrorMessage: '',
  oneUser: null,
  opDone: false,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        loader: true,
      }
    case FETCH_USER_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        opErrorMessage: '',
        loader: false,
      }
    case FETCH_USER_LIST_FAILED:
      return {
        ...state,
        errorMessage: 'Failed to get user list',
        opErrorMessage: '',
        loader: false,
      }
    case INIT_USER_ACTION_STATE:
      return {
        ...state,
        opDone: true,
      }
    case GET_USER_BY_ID:
      return {
        ...state,
        oneUser: action.payload,
        opErrorMessage: '',
        opDone: true,
      }
    case UPDATE_USER:
    case CREATE_USER:
    case DELETE_USER:
      return {
        ...state,
        opDone: false,
        opErrorMessage: '',
      }
    case OPERATION_USER_SUCCESS:
      return {
        ...state,
        opDone: true,
        opErrorMessage: 'success',
      }
    case OPERATION_USER_FAILED:
      return {
        ...state,
        opDone: true,
        opErrorMessage: action.payload,
      }   
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        userList: null,
        errorMessage: '',
        opErrorMessage: '',
        opDone: false,
      }
    }
    default:
      return state
  }
}

export default users
