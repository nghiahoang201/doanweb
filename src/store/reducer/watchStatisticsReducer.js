import {
  GET_AN_STATISTICS_REQ,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_ERROR,
} from "../action/statistics";

const initialValue = {
  statisticss: [],
  statistics: {},
  loadingstatistics: true,
  errorstatistics: null,
};

const watchStatisticsReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_AN_STATISTICS_REQ:
      return {
        ...state,
        loadingstatistics: true,
      };
    case GET_STATISTICS_SUCCESS:
      return {
        ...state,
        statisticss: action.payload,
        loadingstatistics: false,
      };

    case GET_STATISTICS_ERROR:
      return {
        ...state,
        loadingstatistics: false,
        errorstatistics: action.payload,
      };

    default:
      return { ...state };
  }
};

export default watchStatisticsReducer;
