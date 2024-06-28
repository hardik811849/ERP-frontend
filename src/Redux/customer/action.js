import axios from "axios";
import { CUSTOMER_DELETE, CUSTOMER_GET, ERROR, LOADING } from "../actionType";

export const get_customer = (handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.get(`${process.env.REACT_APP_API}customer/all`);
    res = await res.data;
    if (res.success) {
      dispatch({ type: CUSTOMER_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const get_customer_by_id = (id, handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.get(`${process.env.REACT_APP_API}customer/${id}`);
    res = await res.data;
    if (res.success) {
      dispatch({ type: CUSTOMER_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const delete_customer = (id, handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.delete(
      `${process.env.REACT_APP_API}customer/delete/${id}`
    );
    res = await res.data;
    if (res.success) {
      dispatch({ type: CUSTOMER_DELETE, payload: id });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};
