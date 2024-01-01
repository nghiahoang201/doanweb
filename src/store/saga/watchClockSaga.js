import { call, put, takeEvery } from "redux-saga/effects";
import request from "../../req";
import {
  GET_AN_CLOCK_REQ,
  GET_CLOCK_REQ,
  getAnClockError,
  getAnClockSuccess,
  getClockError,
  getClockSuccess,
} from "../action/clockAction";
import { accessToken } from "../token";

const getAllClock = async () => {
  return await request.get("clock");
};

const getAnClock = async (id) => {
  return await request.get(`clock/${id}`);
};

export const updateClock = async (clock) => {
  return await request.put(
    `clock/${clock?.clockId ? clock?.clockId : clock?._id}`,
    clock?.formData ? clock?.formData : { ...clock },

    {
      headers: { Authorization: "Bearer " + accessToken },
    }
  );
};

export const createClock = async (clock) => {
  return await request.post(`clock/create`, clock, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

export const deleteClock = async (clockId) => {
  return await request.delete(`clock/${clockId}`, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

function* fetchGetAllClock() {
  try {
    const response = yield call(getAllClock);
    yield put(getClockSuccess(response.data));
  } catch (error) {
    yield put(getClockError(error));
  }
}
//get An
function* fetchGetAnClock({ payload }) {
  try {
    const response = yield call(getAnClock, payload);
    yield put(getAnClockSuccess(response.data));
  } catch (error) {
    yield put(getAnClockError(error));
  }
}

function* watchClockSaga() {
  yield takeEvery(GET_CLOCK_REQ, fetchGetAllClock);
  yield takeEvery(GET_AN_CLOCK_REQ, fetchGetAnClock);
}

export default watchClockSaga;
