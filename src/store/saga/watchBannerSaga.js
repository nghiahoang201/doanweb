import { put, call, takeEvery } from "redux-saga/effects";
import request from "../../req";
import {
  GET_AN_BANNER_REQ,
  GET_BANNER_REQ,
  getAnBannerError,
  getAnBannerSuccess,
  getBannerError,
  getBannerSuccess,
} from "../action/bannerAction";
import { accessToken } from "../token";

const banner = async () => {
  return await request.get("banner");
};

const anBanner = async (bannerId) => {
  return await request.get(`banner/${bannerId}`);
};

export const updateBanner = async (banner) => {
  return await request.put(`banner/${banner?.bannerId}`, banner?.formData, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

export const createBanner = async (banner) => {
  return await request.post(`banner/create`, banner, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

export const deleteBanner = async (bannerId) => {
  return await request.delete(`banner/${bannerId}`, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

function* getBanner() {
  try {
    const response = yield call(banner);
    yield put(getBannerSuccess(response.data));
  } catch (error) {
    yield put(getBannerError(error));
  }
}

function* getAnBanner({ payload }) {
  try {
    const response = yield call(anBanner, payload);
    yield put(getAnBannerSuccess(response.data));
  } catch (error) {
    yield put(getAnBannerError(error));
  }
}

function* watchBannerSaga() {
  yield takeEvery(GET_BANNER_REQ, getBanner);
  yield takeEvery(GET_AN_BANNER_REQ, getAnBanner);
}

export default watchBannerSaga;
