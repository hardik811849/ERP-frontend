import {
  ERROR,
  LOADING,
  PRODUCTION_CREATE,
  PRODUCTION_GET,
} from "../actionType";

const init = {
  isLoading: false,
  error: "",
  production: [],
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
    case PRODUCTION_GET:
      return {
        ...state,
        production: payload,
        isLoading: false,
      };
    case PRODUCTION_CREATE:
      return {
        ...state,
        production: [...state.production, payload],
        isLoading: false,
      };
    default:
      return state;
  }
};
