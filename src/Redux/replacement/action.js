import axios from "axios";
import {
  ERROR,
  LOADING,
  REPLACEMENT_CREATE,
  REPLACEMENT_DELETE,
  REPLACEMENT_EDIT,
  REPLACEMENT_GET,
} from "../actionType";

export const get_replacement = (handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    // let res = await axios.get(
    //   `https://366e-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app/billing/all`
    // );
    let res = await axios.get(`${process.env.REACT_APP_API}replacement/all`);
    res = await res.data;
    if (res.success) {
      dispatch({ type: REPLACEMENT_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const delete_replacement =
  (id, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}replacement/delete/${id}`
        // `https://bf01-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app/billing/delete/${id}`
      );
      res = await res.data;
      if (res.success) {
        handleRes("Deleted Successfully", "/replacement");
        dispatch({ type: REPLACEMENT_DELETE, payload: id });
        dispatch(get_replacement());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const update_replacement =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    console.log(data);
    try {
      let res = await axios.patch(
        // `https://bf01-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app/billing/update/${data.billing_id}`,
        `${process.env.REACT_APP_API}replacement/update/${data.replacement_id}`,
        data
      );
      res = await res.data;
      if (res.success) {
        handleRes("Updated Successfully", "/replacement");
        dispatch({ type: REPLACEMENT_EDIT, payload: res.data });
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const create_replacement =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.post(
        // `https://366e-2409-40c1-10d9-4e33-3d4b-3bcc-5cdd-cf4f.ngrok-free.app`,
        `${process.env.REACT_APP_API}replacement/create`,
        data
      );
      res = await res.data;
      if (res.success) {
        handleRes("Created Successfully", "/replacement");
        dispatch({ type: REPLACEMENT_CREATE, payload: res.data });
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };
