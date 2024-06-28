import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";

import { reducer as authReducer } from "./auth/reducer";
import { reducer as inquiryReducer } from "./inquiry/reducer";
import { reducer as ordersReducer } from "./orders/reducer";
import { reducer as storeReducer } from "./store/reducer";
import { reducer as purchaseReducer } from "./purchase/reducer";
import { reducer as productionReducer } from "./production/reducer";
import { reducer as packagingReducer } from "./packaging/reducer";
import { reducer as billingReducer } from "./billing/reducer";
import { reducer as dispatchReducer } from "./dispatch/reducer";
import { reducer as replacementReducer } from "./replacement/reducer";
import { reducer as employeeReducer } from "./employee/reducer";

const rootReducer = combineReducers({
  authReducer,
  inquiryReducer,
  ordersReducer,
  storeReducer,
  purchaseReducer,
  productionReducer,
  packagingReducer,
  billingReducer,
  dispatchReducer,
  replacementReducer,
  employeeReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
