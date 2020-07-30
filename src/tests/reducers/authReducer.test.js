import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";
import "@testing-library/jest-dom";

const initState = {
  checking: true,
};

describe("authReducer Tests", () => {
  test("should return the default state", () => {
    const action = {};
    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });

  test("should authenticate the user", () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "Ismael",
      },
    };

    const state = authReducer(initState, action);
    expect(state).toEqual({ checking: false, uid: "123", name: "Ismael" });
  });
});
