import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";

import Search from "./search";
import Listing from "./list";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Router>
          <div className="row mt-5 justify-content-md-center">
            <div className="col-md-12">
              <Search />
            </div>
          </div>
          <Listing />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
