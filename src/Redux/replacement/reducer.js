import {
  ERROR,
  LOADING,
  REPLACEMENT_CREATE,
  REPLACEMENT_GET,
} from "../actionType";

const init = {
  isLoading: false,
  error: "",
  replacement: [],
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
    case REPLACEMENT_GET:
      return {
        ...state,
        replacement: payload,
        isLoading: false,
      };
    case REPLACEMENT_CREATE:
      return {
        ...state,
        replacement: [...state.replacement, payload],
        isLoading: false,
      };
    default:
      return state;
  }
};
