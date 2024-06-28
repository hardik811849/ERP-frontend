import { BILLING_CREATE, BILLING_GET, ERROR, LOADING } from "../actionType";

const init = {
  isLoading: false,
  error: "",
  billing: [],
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
    case BILLING_GET:
      return {
        ...state,
        billing: payload,
        isLoading: false,
      };
    case BILLING_CREATE:
      return {
        ...state,
        billing: [...state.billing, payload],
        isLoading: false,
      };
    default:
      return state;
  }
};
