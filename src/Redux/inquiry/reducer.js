import { ERROR, INQUIRY_CREATE, INQUIRY_GET, LOADING } from "../actionType";

const init = {
  isLoading: false,
  error: "",
  inquiry: [],
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
    case INQUIRY_CREATE:
      return {
        ...state,
        inquiry: [...state.inquiry, payload],
        isLoading: false,
      };
    case INQUIRY_GET:
      return {
        ...state,
        inquiry: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
