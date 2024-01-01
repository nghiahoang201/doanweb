import {
  GET_BRAND_REQ,
  GET_BRAND_SUCCESS,
  GET_BRAND_ERROR,
  GET_AN_BRAND_REQ,
  GET_AN_ABRAND_SUCCESS,
  GET_AN_BRAND_ERROR,
} from "../action/brandAction";

const initialValue = {
  brands: [],
  brand: {},
  loadingBrand: false,
  errorReq: null,
};

const watchBrandReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_BRAND_REQ:
    case GET_AN_BRAND_REQ:
      return { ...state, loadingBrand: true };
    case GET_BRAND_SUCCESS:
      return {
        ...state,
        brands: action.payload,
        loadingBrand: false,
      };
    case GET_AN_ABRAND_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        loadingBrand: false,
      };
    case GET_BRAND_ERROR:
    case GET_AN_BRAND_ERROR:
      return {
        ...state,
        loadingBrand: false,
        errorReq: action.payload,
      };
    default:
      return { ...state };
  }
};

export default watchBrandReducer;
