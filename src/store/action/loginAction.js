export const LOGIN_REQ = "LOGIN_REQ";
export const LOGIN_REQ_SUCCESS = "LOGIN_REQ_SUCCESS";
export const LOGIN_REQ_ERROR = "LOGIN_REQ_ERROR";

export const loginReq = (user) => ({
  type: LOGIN_REQ,
  payload: user,
});

export const loginReqSuccess = (user) => ({
  type: LOGIN_REQ_SUCCESS,
  payload: user,
});

export const loginReqError = (error) => ({
  type: LOGIN_REQ_ERROR,
  payload: error,
});
