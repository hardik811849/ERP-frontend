import axios from "axios";
import {
  ERROR,
  INQUIRY_CREATE,
  INQUIRY_DELETE,
  INQUIRY_EDIT,
  INQUIRY_GET,
  LOADING,
} from "../actionType";

export const get_inquiry = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.get(`${process.env.REACT_APP_API}inquiry`);
    res = await res?.data;
    if (res.success) {
      dispatch({ type: INQUIRY_GET, payload: res.data });
    } else {
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};
// create inquiry
export const create_inquiry =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });

    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API}inquiry/create`,
        data
      );
      res = await res?.data;
      if (res.success) {
        dispatch({ type: INQUIRY_CREATE, payload: res.data });
        dispatch(get_inquiry());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const edit_inquiry =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });

    try {
      let res = await axios.patch(
        `${process.env.REACT_APP_API}inquiry/update/${data._id}`,
        data
      );
      res = await res?.data;
      if (res.success) {
        dispatch({ type: INQUIRY_EDIT, payload: res.data });
        dispatch(get_inquiry());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const delete_inquiry =
  (id, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}inquiry/delete/${id}`
      );
      res = await res?.data;
      if (res.success) {
        dispatch({ type: INQUIRY_DELETE, payload: id });
        dispatch(get_inquiry());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
