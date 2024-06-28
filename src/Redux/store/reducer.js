import React from "react";
import {
  ERROR,
  LOADING,
  STORE_CREATE,
  STORE_DELETE,
  STORE_EDIT,
  STORE_GET,
} from "../actionType";

const init = {
  isLoading: false,
  error: "",
  store: [],
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
    case STORE_GET:
      return {
        ...state,
        store: payload,
        isLoading: false,
        error: "",
      };

    case STORE_CREATE:
      return {
        ...state,
        store: [...state.store, payload],
        isLoading: false,
        error: "",
      };

    case STORE_EDIT:
      return {
        ...state,
        store: state.store.map((item) =>
          item.store_id === payload.store_id ? payload : item
        ),
        isLoading: false,
        error: "",
      };

    case STORE_DELETE:
      return {
        ...state,
        store: state.store.filter((item) => item.store_id !== payload),
      };

    default:
      return state;
  }
};
