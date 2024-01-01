import { all } from "redux-saga/effects";
import watchBrandSaga from "./watchBrandSaga";
import watchClockSaga from "./watchClockSaga";
import watchBannerSaga from "./watchBannerSaga";
import watchCustomerSaga from "./watchCustomerSage";
import watchLoginSaga from "./watchLoginSaga";
import watchStatisticsSaga from "./watchStatisticsSaga";

export default function* rootSaga() {
  yield all([
    watchBrandSaga(),
    watchClockSaga(),
    watchBannerSaga(),
    watchCustomerSaga(),
    watchLoginSaga(),
    watchStatisticsSaga(),
  ]);
}
