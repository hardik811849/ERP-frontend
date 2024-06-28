import { ERROR, LOADING, PURCHASE_CREATE, PURCHASE_GET } from "../actionType";

const init = {
  isLoading: false,
  error: "",
  purchase: [],
};

export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case PURCHASE_GET:
      return {
        ...state,
        purchase: payload,
        isLoading: false,
        error: "",
      };
    case PURCHASE_CREATE:
      return {
        ...state,
        isLoading: false,
        purchase: [...state.purchase, payload],
        error: "",
      };
    default:
      return state;
  }
};
