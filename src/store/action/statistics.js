export const GET_STATISTICS_REQ = "GET_STATISTICS_REQ";
export const GET_STATISTICS_SUCCESS = "GET_STATISTICS_SUCCESS";
export const GET_STATISTICS_ERROR = "GET_STATISTICS_ERROR";

export const GET_AN_STATISTICS_REQ = "GET_AN_STATISTICS_REQ";
export const GET_AN_STATISTICS_SUCCESS = "GET_AN_STATISTICS_SUCCESS";
export const GET_AN_STATISTICS_ERROR = "GET_AN_STATISTICS_ERROR";

export const getAllStatistics = () => ({
  type: GET_STATISTICS_REQ,
});

export const getAllStatisticsSuccess = (statistics) => ({
  type: GET_STATISTICS_SUCCESS,
  payload: statistics,
});

export const getAllStatisticsError = (error) => ({
  type: GET_STATISTICS_ERROR,
  payload: error,
});
