import {
  EMPLOYEE_CREATE,
  EMPLOYEE_DELETE,
  EMPLOYEE_EDIT,
  EMPLOYEE_GET,
  ERROR,
  LOADING,
} from "../actionType";

const init = {
  isLoading: false,
  error: "",
  employee: [],
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
    case EMPLOYEE_GET:
      return {
        ...state,
        employee: payload,
        isLoading: false,
      };
    case EMPLOYEE_CREATE:
      return {
        ...state,
        isLoading: false,
        employee: [...state.employee, payload],
        error: "",
      };
    case EMPLOYEE_EDIT:
      return {
        ...state,
        isLoading: false,
        employee: state.employee.map((item) =>
          item.employee_id === payload.employee_id ? payload : item
        ),
        error: "",
      };
    case EMPLOYEE_DELETE:
      return {
        ...state,
        isLoading: false,
        employee: state.employee.filter((item) => item.employee_id !== payload),
        error: "",
      };
    default:
      return state;
  }
};
