import axios from "axios";
import {
  ERROR,
  LOADING,
  PRODUCTION_CREATE,
  PRODUCTION_DELETE,
  PRODUCTION_EDIT,
  PRODUCTION_GET,
} from "../actionType";

export const get_production = (handleError) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.get(`${process.env.REACT_APP_API}production/all`);
    res = await res.data;
    if (res.success) {
      console.log(res);
      dispatch({ type: PRODUCTION_GET, payload: res.data });
    } else {
      handleError(res.message);
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    handleError(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const delete_production =
  (id, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}production/delete/${id}`
      );
      res = await res.data;
      if (res.success) {
        handleRes("Deleted Successfully", "/production");
        dispatch({ type: PRODUCTION_DELETE, payload: id });
        dispatch(get_production());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const update_production =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    console.log(data);
    try {
      let res = await axios.patch(
        `${process.env.REACT_APP_API}production/update/${data.production_id}`,
        data
      );
      res = await res.data;
      if (res.success) {
        handleRes("Updated Successfully", "/production");
        dispatch({ type: PRODUCTION_EDIT, payload: res.data });
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const create_production =
  (data, handleRes, handleError) => async (dispatch) => {
    dispatch({ type: LOADING });
    console.log(data);
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API}production/create`,
        data
      );
      res = await res.data;
      console.log(res);
      if (res.success) {
        handleRes("Created Successfully", "/production");
        dispatch({ type: PRODUCTION_CREATE, payload: res.data });
        dispatch(get_production());
      } else {
        handleError(res.message);
        dispatch({ type: ERROR, payload: res.message });
      }
    } catch (error) {
      handleError(error.message);
      dispatch({ type: ERROR, payload: error.message });
    }
  };
