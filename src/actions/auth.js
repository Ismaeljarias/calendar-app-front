import { types } from "../types/types";
import { fetchNoToken, fetchWithToken } from "../helpers/fetch";
import Swal from "sweetalert2";
import { eventLogout } from "./events";

export const startLogin = (email, password) => async (dispatch) => {
  const resp = await fetchNoToken("auth", { email, password }, "POST");
  const body = await resp.json();

  if (body.ok) {
    localStorage.setItem("token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime());

    dispatch(
      login({
        uid: body.uid,
        name: body.name,
      })
    );
  } else {
    Swal.fire("Error", body.msg, "error");
  }
};

export const startRegister = (name, email, password) => async (dispatch) => {
  const resp = await fetchNoToken(
    "auth/new",
    { name, email, password },
    "POST"
  );
  const body = await resp.json();

  if (body.ok) {
    localStorage.setItem("token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime());

    dispatch(
      login({
        uid: body.uid,
        name: body.name,
      })
    );
  } else {
    Swal.fire("Error", body.msg, "error");
  }
};

export const startChecking = () => async (dispatch) => {
  const resp = await fetchWithToken("auth/renew");
  const body = await resp.json();

  if (body.ok) {
    localStorage.setItem("token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime());

    dispatch(
      login({
        uid: body.uid,
        name: body.name,
      })
    );
  } else {
    dispatch(checkingFinish());
  }
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => async (dispatch) => {
  localStorage.clear();

  dispatch(eventLogout());
  dispatch(logout());
};

const logout = () => ({
  type: types.authLogout,
});
