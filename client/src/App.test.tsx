// App.test.tsx
import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/store"; // Assuming rootReducer is the combined reducers
import App from "./App";

// Create a real store with thunk middleware for async actions
const store = createStore(rootReducer, applyMiddleware(thunk));

describe("App Component", () => {
  it("renders Navbar and TaskList components", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Navbar component text/)).toBeInTheDocument(); // Assumed placeholder text
    expect(screen.getByText(/TaskList component text/)).toBeInTheDocument(); // Assumed placeholder text
  });

  it("dispatches actions on mount", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(dispatchSpy).toHaveBeenCalledWith(fetchCsrfToken());
    expect(dispatchSpy).toHaveBeenCalledWith(fetchTasks(1));
  });
});
