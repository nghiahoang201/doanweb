import {
  GET_BANNER_REQ,
  GET_BANNER_SUCCESS,
  GET_BANNER_ERROR,
  GET_AN_BANNER_REQ,
  GET_AN_BANNER_SUCCESS,
  GET_AN_BANNER_ERROR,
} from "../action/bannerAction";

const initialValue = {
  banners: [],
  banner: {},
  loadingBanner: false,
  error: null,
};
const watchBannerReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_BANNER_REQ:
    case GET_AN_BANNER_REQ:
      return {
        ...state,
        loadingBanner: true,
      };
    case GET_BANNER_SUCCESS:
      return {
        ...state,
        banners: action.payload,
        loadingBanner: false,
      };
    case GET_AN_BANNER_SUCCESS:
      return {
        ...state,
        banner: action.payload,
        loadingBanner: false,
      };
    case GET_BANNER_ERROR:
    case GET_AN_BANNER_ERROR:
      return {
        ...state,
        loadingBanner: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default watchBannerReducer;
