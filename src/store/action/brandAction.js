export const GET_BRAND_REQ = "GET_BRAND_REQ";
export const GET_BRAND_SUCCESS = "GET_BRAND_SUCCESS";
export const GET_BRAND_ERROR = "GET_BRAND_ERROR";
//get An
export const GET_AN_BRAND_REQ = "GET_AN_BRAND_REQ";
export const GET_AN_ABRAND_SUCCESS = "GET_AN_ABRAND_SUCCESS";
export const GET_AN_BRAND_ERROR = "GET_AN_BRAND_ERROR";

export const getBrandReq = () => ({
  type: GET_BRAND_REQ,
});

export const getBrandSuccess = (brands) => ({
  type: GET_BRAND_SUCCESS,
  payload: brands,
});

export const getBrandError = (error) => ({
  type: GET_BRAND_ERROR,
  payload: error,
});
//get An
export const getAnBrandReq = (brand_id) => ({
  type: GET_AN_BRAND_REQ,
  payload: brand_id,
});

export const getAnBrandSuccess = (brand) => ({
  type: GET_AN_ABRAND_SUCCESS,
  payload: brand,
});

export const getAnBrandError = (error) => ({
  type: GET_AN_BRAND_ERROR,
  payload: error,
});
