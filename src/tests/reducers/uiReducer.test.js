import { uiReducer } from "../../reducers/uiReducer";
import { uiOpenModal, uiCloseModal } from "../../actions/ui";

import "@testing-library/jest-dom";

const initState = {
  modalOpen: false,
};

describe("uiReducer Tests", () => {
  test("should return the default state", () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test("should open and close the modal", () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer(initState, modalOpen);

    expect(state).toEqual({ modalOpen: true });

    const modalClose = uiCloseModal();
    const stateClose = uiReducer(state, modalClose);

    expect(stateClose).toEqual({ modalOpen: false });
  });
});
