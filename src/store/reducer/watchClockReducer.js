import {
  GET_AN_CLOCK_ERROR,
  GET_AN_CLOCK_REQ,
  GET_AN_CLOCK_SUCCESS,
  GET_CLOCK_ERROR,
  GET_CLOCK_REQ,
  GET_CLOCK_SUCCESS,
} from "../action/clockAction";

const initialValue = {
  clocks: [],
  clock: {},
  loading: false,
  error: "",
};

const watchClockReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_CLOCK_REQ:
    case GET_AN_CLOCK_REQ:
      return { ...state, loading: true };
    case GET_CLOCK_SUCCESS:
      return {
        ...state,
        clocks: action.payload,
        loading: false,
      };
    case GET_AN_CLOCK_SUCCESS:
      return {
        ...state,
        clock: action.payload,
        loading: false,
      };
    case GET_CLOCK_ERROR:
    case GET_AN_CLOCK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};
export default watchClockReducer;
