import { ERROR, LOADING, SUCCESS, SUCCESS_LOGIN } from "../actionType";

const init = {
  isAuth: false,
  isLoading: false,
  error: "",
  role: "",
  user: {},
  token: "",
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
    case SUCCESS_LOGIN:
      return {
        ...state,
        isAuth: true,
        role: payload.role,
        token: payload.data.token,
        user: payload.data.user,
        isLoading: false,
      };
    default:
      return state;
  }
};
