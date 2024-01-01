export const GET_CLOCK_REQ = "GET_CLOCK_REQ";
export const GET_CLOCK_SUCCESS = "GET_CLOCK_SUCCESS";
export const GET_CLOCK_ERROR = "GET_CLOCK_ERROR";
export const GET_AN_CLOCK_REQ = "GET_AN_CLOCK_REQ";
export const GET_AN_CLOCK_SUCCESS = "GET_AN_CLOCK_SUCCESS";
export const GET_AN_CLOCK_ERROR = "GET_AN_CLOCK_ERROR";

export const getClockReq = () => ({
  type: GET_CLOCK_REQ,
});

export const getClockSuccess = (clocks) => ({
  type: GET_CLOCK_SUCCESS,
  payload: clocks,
});

export const getClockError = (error) => ({
  type: GET_CLOCK_ERROR,
  payload: error,
});
//get An
export const getAnClockReq = (clock_id) => ({
  type: GET_AN_CLOCK_REQ,
  payload: clock_id,
});

export const getAnClockSuccess = (clock) => ({
  type: GET_AN_CLOCK_SUCCESS,
  payload: clock,
});

export const getAnClockError = (error) => ({
  type: GET_AN_CLOCK_ERROR,
  payload: error,
});
