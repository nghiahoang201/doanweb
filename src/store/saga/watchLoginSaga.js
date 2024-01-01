import { call, put, takeEvery } from "redux-saga/effects";
import request from "../../req";
import {
  LOGIN_REQ,
  loginReqSuccess,
  loginReqError,
} from "../action/loginAction";
import { accessToken } from "../token";

const login = async (user) => {
  return await request.post("admin/login", user);
};

export const getUser = async (userId) => {
  return await request.get(`admin/user/${userId}`);
};

export const updateUser = async (user) => {
  return await request.put(`admin/update/${user?.userId}`, user?.formData, {
    headers: { Authorization: "Bearer " + accessToken },
  });
};

export const updatePassword = async (user) => {
  return await request.put(
    `admin/updatePassword/${user?.userId}`,
    user?.formData,
    {
      headers: { Authorization: "Bearer " + accessToken },
    }
  );
};

function* fetchLogin({ payload }) {
  try {
    const response = yield call(login, payload);

    if (response.status === 200) {
      yield put(loginReqSuccess(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("dataUser", JSON.stringify(response.data));
      localStorage.setItem("isLogin", true);
      window.location.href = "/admin";
    }
  } catch (error) {
    yield put(loginReqError(error.response.data));
  }
}

function* watchLoginReducer() {
  yield takeEvery(LOGIN_REQ, fetchLogin);
}

export default watchLoginReducer;
