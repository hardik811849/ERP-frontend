import axios from "axios";
import {
  EMPLOYEE_CREATE,
  EMPLOYEE_DELETE,
  EMPLOYEE_EDIT,
  EMPLOYEE_GET,
  ERROR,
  LOADING,
} from "../actionType";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiaGFyZGlrIiwiaWF0IjoxNzE2OTAwNjY2LCJleHAiOjE3MTY5MTE0NjZ9.0oIoDQVD61_-LMkCqoMTSIJWj646Ey8uqkg3bhQJEvk";
export const get_employee = (handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.get(`${process.env.REACT_APP_API}employee/all`, {
      headers: {
        authorization: token,
      },
    });
    res = await res.data;
    if (res.success) {
      dispatch({ type: EMPLOYEE_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const get_employee_by_id = (id, handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.get(`${process.env.REACT_APP_API}employee/${id}`, {
      headers: {
        authorization: token,
      },
    });
    res = await res.data;
    if (res.success) {
      dispatch({ type: EMPLOYEE_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const delete_employee =
  (id, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}employee/delete/${id}`
      );
      res = await res.data;
      if (res.success) {
        handleRes("Deleted Successfully", "/employee");
        dispatch({ type: EMPLOYEE_DELETE, payload: res.data });
        dispatch(get_employee());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const update_employee =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    console.log(data);
    try {
      let res = await axios.patch(
        `${process.env.REACT_APP_API}employee/update/${data._id}`,
        data
      );
      res = await res.data;
      if (res.success) {
        dispatch({ type: EMPLOYEE_EDIT, payload: res.data });
        dispatch(get_employee());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const create_employee =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API}employee/create`,
        data,
        {
          headers: {
            authorization: token,
          },
        }
      );
      res = await res.data;
      if (res.success) {
        dispatch({ type: EMPLOYEE_CREATE, payload: res.data });
        dispatch(get_employee());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
