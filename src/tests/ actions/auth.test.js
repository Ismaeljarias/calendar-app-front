import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

import "@testing-library/jest-dom";

import { startLogin, startChecking, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

let token = "";

describe("Auth actions tests", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startLogin correct", async () => {
    await store.dispatch(startLogin("ismaeljarias@gmail.com", "123456"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    token = localStorage.setItem.mock.calls[0][1];
  });

  test("startLogin incorrect", async () => {
    await store.dispatch(startLogin("ismaeljarias@gmail.com", "123456789"));
    let actions = store.getActions();

    expect(actions).toEqual([]);

    expect(Swal.fire).toHaveBeenCalledWith("Error", "Wrong password", "error");

    await store.dispatch(startLogin("ismaeljarias@gmail2.com", "123456"));
    actions = store.getActions();

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "There is not user with this email",
      "error"
    );
  });

  test("startRegister correct", async () => {
    fetchModule.fetchNoToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "Gohan",
          token: "ABC123ABC123",
        };
      },
    }));

    await store.dispatch(startRegister("test@test.com", "123456", "test"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "Gohan",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123ABC123");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking correct ", async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "Gohan",
          token: "ABC123ABC123",
        };
      },
    }));

    await store.dispatch(startChecking());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "Gohan",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123ABC123");
  });
});
