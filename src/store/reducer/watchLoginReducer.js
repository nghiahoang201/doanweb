import {
  LOGIN_REQ,
  LOGIN_REQ_SUCCESS,
  LOGIN_REQ_ERROR,
} from "../action/loginAction";

const initialValue = {
  user: {},
  loadingUser: true,
  errorLogin: null,
};

const watchLoginReducer = (state = initialValue, action) => {
  switch (action.type) {
    case LOGIN_REQ:
      return {
        ...state,
        loadingUser: true,
      };

    case LOGIN_REQ_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loadingUser: false,
      };

    case LOGIN_REQ_ERROR:
      return {
        ...state,
        loadingUser: false,
        errorLogin: action.payload,
      };

    default:
      return { ...state };
  }
};

export default watchLoginReducer;
