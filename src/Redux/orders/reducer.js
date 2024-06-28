import React from "react";
import {
  ERROR,
  LOADING,
  ORDERS_CREATE,
  ORDERS_DELETE,
  ORDERS_EDIT,
  ORDERS_GET,
} from "../actionType";
const init = {
  isLoading: false,
  error: "",
  orders: [],
};
export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case ORDERS_GET:
      return {
        ...state,
        orders: payload,
        isLoading: false,
        error: "",
      };
    case ORDERS_CREATE:
      return {
        ...state,
        isLoading: false,
        orders: [...state.orders, payload],
        error: "",
      };
    case ORDERS_EDIT:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.map((order) =>
          order.order_id === payload.order_id ? payload : order
        ),
        error: "",
      };
    case ORDERS_DELETE:
      const val = state.orders.filter((order) => order.order_id !== payload);
      console.log(val);
      return {
        ...state,
        isLoading: false,
        orders: val,
        error: "",
      };
    default:
      return state;
  }
};
