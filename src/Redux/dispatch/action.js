import axios from "axios";
import {
  DISPATCH_CREATE,
  DISPATCH_DELETE,
  DISPATCH_EDIT,
  DISPATCH_GET,
  ERROR,
  LOADING,
} from "../actionType";

export const get_dispatch = (handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    // let res = await axios.get(
    //   `https://366e-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app/billing/all`
    // );
    let res = await axios.get(`${process.env.REACT_APP_API}dispatch/all`);
    res = await res.data;
    if (res.success) {
      dispatch({ type: DISPATCH_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const delete_dispatch =
  (id, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}dispatch/delete/${id}`
        // `https://bf01-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app/billing/delete/${id}`
      );
      res = await res.data;
      if (res.success) {
        handleRes("Deleted Successfully", "/dispatch");
        dispatch({ type: DISPATCH_DELETE, payload: id });
        dispatch(get_dispatch());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const update_dispatch =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    console.log(data);
    try {
      let res = await axios.patch(
        // `https://bf01-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app/billing/update/${data.billing_id}`,
        `${process.env.REACT_APP_API}dispatch/update/${data.dispatch_id}`,
        data
      );
      res = await res.data;
      if (res.success) {
        handleRes("Updated Successfully", "/dispatch");
        dispatch({ type: DISPATCH_EDIT, payload: res.data });
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const create_dispatch =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.post(
        // `https://366e-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app`,
        `${process.env.REACT_APP_API}dispatch/create`,
        data
      );
      res = await res.data;
      if (res.success) {
        handleRes("Created Successfully", "/dispatch");
        dispatch({ type: DISPATCH_CREATE, payload: res.data });
        dispatch(get_dispatch());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };
