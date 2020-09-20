import axios from "axios";
import {
	GET_RESTAURANTS,
	RESTAURANT_LOADING,
	RESTAURANT_STOP_LOADING,
	RESTAURANT_NOT_FOUND,
} from "./types";

export const getRestaurants = (searchQuery) => async (dispatch) => {
	try {
		dispatch(showLoading());
		const res = await axios.post("/api/express", searchQuery);
		dispatch({ type: GET_RESTAURANTS, payload: res.data });
		dispatch(hideLoading());
		return res;
	} catch (err) {
		dispatch({ type: RESTAURANT_NOT_FOUND });
	}
};

export const getAllRestaurants = (filterQuery) => async (dispatch) => {
	try {
		// console.log(filterQuery);
		dispatch(showLoading());
		const res = await axios.post("/api/express", filterQuery);
		dispatch({
			type: GET_RESTAURANTS,
			payload: res.data,
		});
		dispatch(hideLoading());
		return res;
	} catch (err) {
		dispatch({ type: RESTAURANT_NOT_FOUND });
	}
};

export const showLoading = () => (dispatch) => {
	dispatch({ type: RESTAURANT_LOADING, payload: true });
};

export const hideLoading = () => (dispatch) => {
	dispatch({ type: RESTAURANT_STOP_LOADING, payload: false });
};
