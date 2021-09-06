import {INIT_URL, SIGNOUT_USER_SUCCESS, UPDATE_LOAD_USER, USER_DATA, USER_TOKEN_SET} from "../../constants/ActionTypes";

const INIT_STATE = {
  token: localStorage.getItem('token'),
  initURL: '',
  authUser: null,
  loadingAuthUser: true,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case INIT_URL: {
      return {...state, initURL: action.payload};
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: ''
      }
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
        loadingAuthUser: false
      };
    }

    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadingAuthUser: action.payload
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }

    default:
      return state;
  }
}
