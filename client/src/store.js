import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import rootReducer from "./reducers";

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(reduxThunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);
export default store;
