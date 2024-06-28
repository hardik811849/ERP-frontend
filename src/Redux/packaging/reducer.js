import { ERROR, LOADING, PACKAGING_CREATE, PACKAGING_GET } from "../actionType";

const init = {
  isLoading: false,
  error: "",
  packaging: [],
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
    case PACKAGING_GET:
      return {
        ...state,
        packaging: payload,
        isLoading: false,
      };
    case PACKAGING_CREATE:
      return {
        ...state,
        packaging: [...state.packaging, payload],
        isLoading: false,
      };
    default:
      return state;
  }
};
