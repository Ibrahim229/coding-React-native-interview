
import React from "react";
import { store } from "./src/redux/store";
import AppNavigator from "./src/AppNavigator";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
