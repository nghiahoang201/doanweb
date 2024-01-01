import { call, put, takeEvery } from "redux-saga/effects";
import request from "../../req";
import {
  GET_BRAND_REQ,
  GET_AN_BRAND_REQ,
  getBrandSuccess,
  getBrandError,
  getAnBrandSuccess,
  getAnBrandError,
} from "../action/brandAction";
import { accessToken } from "../token";
const getAllBrand = async () => {
  return await request.get("brand");
};

const getAnBrand = async (id) => {
  return await request.get(`brand/${id}`);
};

export const updateBrand = async (brand) => {
  return await request.put(`brand/${brand?.brandId}`, brand?.formData, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

export const createBrand = async (brand) => {
  return await request.post(`brand/create`, brand, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

export const deleteBrand = async (brandId) => {
  return await request.delete(`brand/${brandId}`, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

function* fetchGetAllBrand() {
  try {
    const response = yield call(getAllBrand);
    yield put(getBrandSuccess(response.data));
  } catch (error) {
    yield put(getBrandError(error));
  }
}
//get An
function* fetchGetAnBrand({ payload }) {
  try {
    const response = yield call(getAnBrand, payload);
    yield put(getAnBrandSuccess(response.data));
  } catch (error) {
    yield put(getAnBrandError(error));
  }
}

function* watchBrandSaga() {
  yield takeEvery(GET_BRAND_REQ, fetchGetAllBrand);
  yield takeEvery(GET_AN_BRAND_REQ, fetchGetAnBrand);
}

export default watchBrandSaga;
