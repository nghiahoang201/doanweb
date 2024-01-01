import { call, put, takeEvery } from "redux-saga/effects";
import request from "../../req";
import {
  GET_ALL_CUSTOMER,
  getAllCustomerSuccess,
  getAllCustomerError,
  GET_AN_CUSTOMER,
  getAnCustomerSuccess,
  getAnCustomerError,
} from "../action/customerAction";
import { accessToken } from "../token";

const getAllCustomer = async () => {
  return await request.get("customer");
};

const getAnCustomer = async (customerId) => {
  return await request.get(`customer/${customerId}`);
};

export const createCustomer = async (customer) => {
  return await request.post(`customer/create`, customer);
};

export const deleteCustomer = async (customerId) => {
  return await request.delete(`customer/${customerId}`, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

export const updateCustomer = async (customer) => {
  return await request.put(
    `customer/${customer?._id}`,
    { ...customer },
    {
      headers: { Authorization: "Bearer " + accessToken },
    }
  );
};

function* fetchGetAllCustomer() {
  try {
    const response = yield call(getAllCustomer);
    yield put(getAllCustomerSuccess(response.data));
  } catch (error) {
    yield put(getAllCustomerError(error));
  }
}

function* fetchGetAnCustomer({ payload }) {
  try {
    const response = yield call(getAnCustomer, payload);
    yield put(getAnCustomerSuccess(response.data));
  } catch (error) {
    yield put(getAnCustomerError(error));
  }
}

function* watchCustomerSaga() {
  yield takeEvery(GET_ALL_CUSTOMER, fetchGetAllCustomer);
  yield takeEvery(GET_AN_CUSTOMER, fetchGetAnCustomer);
}

export default watchCustomerSaga;
