export const GET_ALL_CUSTOMER = "GET_ALL_CUSTOMER";
export const GET_ALL_CUSTOMER_SUCCESS = "GET_ALL_CUSTOMER_SUCCESS";
export const GET_ALL_CUSTOMER_ERROR = "GET_ALL_CUSTOMER_ERROR";
export const GET_AN_CUSTOMER = "GET_AN_CUSTOMER";
export const GET_AN_CUSTOMER_SUCCESS = "GET_AN_CUSTOMER_SUCCESS";
export const GET_AN_CUSTOMER_ERROR = "GET_AN_CUSTOMER_ERROR";

export const getAllCustomer = () => ({
  type: GET_ALL_CUSTOMER,
});

export const getAllCustomerSuccess = (customer) => ({
  type: GET_ALL_CUSTOMER_SUCCESS,
  payload: customer,
});

export const getAllCustomerError = (error) => ({
  type: GET_ALL_CUSTOMER,
  payload: error,
});

export const getAnCustomer = (customerId) => ({
  type: GET_AN_CUSTOMER,
  payload: customerId,
});

export const getAnCustomerSuccess = (customer) => ({
  type: GET_AN_CUSTOMER_SUCCESS,
  payload: customer,
});

export const getAnCustomerError = (error) => ({
  type: GET_AN_CUSTOMER_ERROR,
  payload: error,
});
