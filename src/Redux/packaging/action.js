import axios from "axios";
import {
  ERROR,
  LOADING,
  PACKAGING_CREATE,
  PACKAGING_DELETE,
  PACKAGING_EDIT,
  PACKAGING_GET,
} from "../actionType";

export const get_packaging = (handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    // let res = await axios.get(
    //   `https://9da3-2409-40c1-10d9-6edf-a81f-4393-9208-8670.ngrok-free.app/packaging/all`
    // );
    let res = await axios.get(`${process.env.REACT_APP_API}packaging/all`);
    res = await res.data;
    if (res.success) {
      // console.log(res);
      dispatch({ type: PACKAGING_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const delete_packaging =
  (id, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}packaging/delete/${id}`
        // `https://9da3-2409-40c1-10d9-6edf-a81f-4393-9208-8670.ngrok-free.app/packaging/delete/${id}`
      );
      res = await res.data;
      if (res.success) {
        handleRes("Deleted Successfully", "/packaging");
        dispatch({ type: PACKAGING_DELETE, payload: id });
        dispatch(get_packaging());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const update_packaging =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    console.log(data);
    try {
      let res = await axios.patch(
        `${process.env.REACT_APP_API}packaging/update/${data.packaging_id}`,
        data
      );
      res = await res.data;
      if (res.success) {
        handleRes("Updated Successfully", "/packaging");
        dispatch({ type: PACKAGING_EDIT, payload: res.data });
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const create_packaging =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.post(
        // `https://9da3-2409-40c1-10d9-6edf-a81f-4393-9208-8670.ngrok-free.app/packaging/create`,
        `${process.env.REACT_APP_API}packaging/create`,
        data
      );
      // console.log(res);
      res = await res.data;
      // console.log(res);
      if (res.success) {
        handleRes("Created Successfully", "/packaging");
        dispatch({ type: PACKAGING_CREATE, payload: res.data });
        dispatch(get_packaging());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };
