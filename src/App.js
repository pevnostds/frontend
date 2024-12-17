import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MainRoute } from "./components";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
            <MainRoute />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
