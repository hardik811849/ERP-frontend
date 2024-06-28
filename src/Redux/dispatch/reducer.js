import { DISPATCH_CREATE, DISPATCH_GET, ERROR, LOADING } from "../actionType";

const init = {
  isLoading: false,
  error: "",
  dispatch_products: [],
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
    case DISPATCH_GET:
      return {
        ...state,
        dispatch_products: payload,
        isLoading: false,
      };
    case DISPATCH_CREATE:
      return {
        ...state,
        dispatch_products: [...state.dispatch_products, payload],
        isLoading: false,
      };
    default:
      return state;
  }
};
