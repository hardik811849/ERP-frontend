import axios from "axios";
import { ERROR, LOADING, SUCCESS_LOGIN, SUCCESS_REGISTER } from "../actionType";
import Cookies from "js-cookie";

export const doRegister = (userData, handleRes) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_API}auth/${userData.role}/register`,
      userData
    );
    res = await res?.data;
    res = {
      ...res,
      role: userData.role,
    };
    if (res.success) {
      handleRes(res.data.serial_no);
      dispatch({ type: SUCCESS_REGISTER, payload: res });
    } else {
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};
export const doLogin = (userData, handleRes) => async (dispatch) => {
  dispatch({ type: LOADING });
  console.log(userData);
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_API}${userData.path}${userData.role}/login`,
      userData
    );
    res = await res?.data;
    res = {
      ...res,
      role: userData.role,
    };
    if (res.success) {
      Cookies.set("token", res.data);
      Cookies.set("role", res.role);
      handleRes();
      dispatch({ type: SUCCESS_LOGIN, payload: res });
    } else {
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const Logging = (userData, handleRes) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_API}${userData.path}login`,
      userData
    );
    res = await res?.data;
    res = {
      ...res,
      role: userData.role,
    };

    if (res.success) {
      Cookies.set("token", res.data);
      Cookies.set("role", res.role);
      handleRes();
      dispatch({ type: SUCCESS_LOGIN, payload: res });
    } else {
      dispatch({ type: ERROR, payload: res.message });
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

// export const Logging = (userData, handleRes) => async (dispatch) => {
//   dispatch({ type: LOADING });
//   try {
//     let res = await axios.post(
//       `${process.env.REACT_APP_API}${userData.path}/login`,
//       userData
//     );
//     res = await res?.data;
//     res = {
//       ...res,
//       role: userData.role,
//     };
//     if (res.success) {
//       handleRes();
//       dispatch({ type: SUCCESS_LOGIN, payload: res });
//     } else {
//       dispatch({ type: ERROR, payload: res.message });
//     }
//   } catch (error) {
//     dispatch({ type: ERROR, payload: error.message });
//   }
// };
