import { call, put, takeEvery } from "redux-saga/effects";
import request from "../../req";
import {
  GET_STATISTICS_REQ,
  getAllStatisticsSuccess,
  getAllStatisticsError,
} from "../action/statistics";
import { accessToken } from "../token";

const getAllStatistics = async () => {
  return await request.get("statistics");
};

export const createStatistics = async (statistics) => {
  return await request.post(
    `statistics/create`,
    { ...statistics },
    {
      headers: { Authorization: "Bearer " + accessToken },
    }
  );
};

export const deleteStatistics = async (statisticsId) => {
  return await request.delete(`statistics/${statisticsId}`, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

export const updateStatistics = async (statistics) => {
  return await request.put(
    `statistics/${statistics?._id}`,
    { ...statistics },
    {
      headers: { Authorization: "Bearer " + accessToken },
    }
  );
};

function* fetchGetAllStatistics() {
  try {
    const response = yield call(getAllStatistics);
    yield put(getAllStatisticsSuccess(response.data));
  } catch (error) {
    yield put(getAllStatisticsError(error));
  }
}

function* watchStatisticsSaga() {
  yield takeEvery(GET_STATISTICS_REQ, fetchGetAllStatistics);
}

export default watchStatisticsSaga;
