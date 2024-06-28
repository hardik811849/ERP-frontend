const init = {
  isLoading: false,
  error: "",
  customer: [],
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
    case CUSTOMER_GET:
      return {
        ...state,
        customer: payload,
        isLoading: false,
      };
    case CUSTOMER_CREATE:
      return {
        ...state,
        customer: [...state.customer, payload],
        isLoading: false,
      };

    default:
      return state;
  }
};
