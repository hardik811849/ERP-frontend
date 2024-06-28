import axios from "axios";
import {
  ERROR,
  LOADING,
  PURCHASE_DELETE,
  PURCHASE_EDIT,
  PURCHASE_GET,
} from "../actionType";

export const get_purchase = (handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.get(`${process.env.REACT_APP_API}purchase`);
    res = await res.data;
    if (res.success) {
      dispatch({ type: PURCHASE_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const get_purchase_by_id = (id, handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.get(`${process.env.REACT_APP_API}purchase/${id}`);
    res = await res.data;
    if (res.success) {
      dispatch({ type: PURCHASE_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const create_purchase =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API}purchase/create`,
        data
      );
      res = await res.data;
      if (res.success) {
        dispatch({ type: PURCHASE_EDIT, payload: res.data });
        dispatch(get_purchase());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
export const update_purchase =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.patch(
        `${process.env.REACT_APP_API}purchase/update/${data._id}`,
        data
      );
      res = await res.data;
      if (res.success) {
        dispatch({ type: PURCHASE_EDIT, payload: res.data });
        dispatch(get_purchase());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const delete_purchase = (id, handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.delete(
      `${process.env.REACT_APP_API}purchase/delete/${id}`
    );
    res = await res.data;
    if (res.success) {
      dispatch({ type: PURCHASE_DELETE, payload: id });
      dispatch(get_purchase());
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};
