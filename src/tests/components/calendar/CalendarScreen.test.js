import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "@testing-library/react";

import "@testing-library/jest-dom";
import CalendarScreen from "../../../components/calendar/CalendarScreen";

import { types } from "../../../types/types";
import { eventSetActive } from "../../../actions/events";

jest.mock("../../../actions/events", () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));
Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  calendar: {
    events: [],
  },
  auth: {
    uid: "123",
    name: "Fernando",
  },
  ui: {
    openModal: false,
  },
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("<CalendarScreen /> Tests", () => {
  test("should display correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Calendar interations tests", () => {
    const calendar = wrapper.find("Calendar");

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

    calendar.prop("onSelectEvent")({ start: "Hello" });
    expect(eventSetActive).toHaveBeenCalledWith({ start: "Hello" });

    act(() => {
      calendar.prop("onView")("week");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    });
  });
});
