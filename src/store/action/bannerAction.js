export const GET_BANNER_REQ = "GET_BANNER_REQ";
export const GET_BANNER_SUCCESS = "GET_BANNER_SUCCESS";
export const GET_BANNER_ERROR = "GET_BANNER_ERROR";
//get an
export const GET_AN_BANNER_REQ = "GET_AN_BANNER_REQ";
export const GET_AN_BANNER_SUCCESS = "GET_AN_BANNER_SUCCESS";
export const GET_AN_BANNER_ERROR = "GET_AN_BANNER_ERROR";

export const getBannerReq = () => ({
  type: GET_BANNER_REQ,
});

export const getBannerSuccess = (banner) => ({
  type: GET_BANNER_SUCCESS,
  payload: banner,
});
export const getBannerError = (error) => ({
  type: GET_BANNER_ERROR,
  payload: error,
});
//get an

export const getAnBannerReq = (bannerId) => ({
  type: GET_AN_BANNER_REQ,
  payload: bannerId,
});

export const getAnBannerSuccess = (banner) => ({
  type: GET_AN_BANNER_SUCCESS,
  payload: banner,
});
export const getAnBannerError = (error) => ({
  type: GET_AN_BANNER_ERROR,
  payload: error,
});
