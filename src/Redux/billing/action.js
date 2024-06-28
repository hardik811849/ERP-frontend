import axios from "axios";
import {
  BILLING_CREATE,
  BILLING_DELETE,
  BILLING_EDIT,
  BILLING_GET,
  ERROR,
  LOADING,
} from "../actionType";

export const get_billing = (handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    // let res = await axios.get(
    //   `https://366e-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app/billing/all`
    // );
    let res = await axios.get(`${process.env.REACT_APP_API}billing/all`);
    res = await res.data;
    if (res.success) {
      console.log(res);
      dispatch({ type: BILLING_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const delete_billing =
  (id, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}billing/delete/${id}`
        // `https://bf01-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app/billing/delete/${id}`
      );
      res = await res.data;
      if (res.success) {
        handleRes("Deleted Successfully", "/billing");
        dispatch({ type: BILLING_DELETE, payload: id });
        dispatch(get_billing());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const update_billing =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    console.log(data);
    try {
      let res = await axios.patch(
        // `https://bf01-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app/billing/update/${data.billing_id}`,
        `${process.env.REACT_APP_API}billing/update/${data.billing_id}`,
        data
      );
      res = await res.data;
      if (res.success) {
        handleRes("Updated Successfully", "/billing");
        dispatch({ type: BILLING_EDIT, payload: res.data });
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const create_billing =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.post(
        // `https://366e-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app`,
        `${process.env.REACT_APP_API}billing/create`,
        data
      );
      res = await res.data;
      if (res.success) {
        handleRes("Created Successfully", "/billing");
        dispatch({ type: BILLING_CREATE, payload: res.data });
        dispatch(get_billing());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };
