import {
  GET_ALL_CUSTOMER,
  GET_ALL_CUSTOMER_SUCCESS,
  GET_ALL_CUSTOMER_ERROR,
  GET_AN_CUSTOMER,
  GET_AN_CUSTOMER_SUCCESS,
  GET_AN_CUSTOMER_ERROR,
} from "../action/customerAction";

const initialValue = {
  customers: [],
  customer: {},
  loadingCustomer: true,
  errorCustomer: null,
};

const watchCustomerReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMER:
    case GET_AN_CUSTOMER:
      return {
        ...state,
        loadingCustomer: true,
      };
    case GET_ALL_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        loadingCustomer: false,
      };
    case GET_AN_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload,
        loadingCustomer: false,
      };
    case GET_ALL_CUSTOMER_ERROR:
    case GET_AN_CUSTOMER_ERROR:
      return {
        ...state,
        loadingCustomer: false,
        errorCustomer: action.payload,
      };

    default:
      return { ...state };
  }
};

export default watchCustomerReducer;
