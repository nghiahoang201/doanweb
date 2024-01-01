import { combineReducers } from "redux";
import watchBrandReducer from "./watchBrandReducer";
import watchClockReducer from "./watchClockReducer";
import watchBannerReducer from "./watchBannerReducer";
import watchCustomerReducer from "./watchCustomerReducer";
import watchLoginReducer from "./watchLoginReducer";
import watchStatisticsReducer from "./watchStatisticsReducer";

const rootReducer = combineReducers({
  watchBrandReducer,
  watchClockReducer,
  watchBannerReducer,
  watchCustomerReducer,
  watchLoginReducer,
  watchStatisticsReducer,
});

export default rootReducer;
