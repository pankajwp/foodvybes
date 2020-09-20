import {
	GET_RESTAURANTS,
	RESTAURANT_LOADING,
	RESTAURANT_STOP_LOADING,
	RESTAURANT_NOT_FOUND,
} from "../actions/types";

const initialState = {
	lists: null,
	loading: false,
};

function restaurantReducer(state = initialState, actions) {
	switch (actions.type) {
		case GET_RESTAURANTS:
			return {
				...state,
				lists: actions.payload,
				loading: false,
			};
		case RESTAURANT_NOT_FOUND:
			return {
				...state,
				lists: null,
				loading: false,
			};
		case RESTAURANT_STOP_LOADING:
			return {
				...state,
				loading: false,
			};
		case RESTAURANT_LOADING:
			return {
				...state,
				loading: actions.payload,
			};
		default:
			return state;
	}
}

export default restaurantReducer;
