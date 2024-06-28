import axios from "axios";
import {
  ERROR,
  LOADING,
  ORDERS_CREATE,
  ORDERS_DELETE,
  ORDERS_EDIT,
  ORDERS_GET,
} from "../actionType";

// get_orders
export const get_orders = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.get(`${process.env.REACT_APP_API}orders/all`);
    res = await res.data;
    if (res.success) {
      dispatch({ type: ORDERS_GET, payload: res.data });
    } else {
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

// create_orders
export const create_orders =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API}orders/create`,
        data
      );
      res = await res.data;
      if (res.success) {
        handleRes("Created Successfully", "/orders");
        dispatch({ type: ORDERS_CREATE, payload: res.data });
        dispatch(get_orders());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };

// edit_orders
export const edit_orders =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.patch(
        `${process.env.REACT_APP_API}orders/update/${data.order_id}`,
        data
      );
      res = await res.data;
      if (res.success) {
        handleRes("Updated Successfully", "/orders");
        dispatch({ type: ORDERS_EDIT, payload: res.data });
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };

// delete_orders
export const delete_orders =
  (id, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}orders/delete/${id}`
      );
      res = await res.data;
      if (res.success) {
        handleRes();
        dispatch({ type: ORDERS_DELETE, payload: id });
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
