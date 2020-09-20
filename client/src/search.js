import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
import { getAllRestaurants } from "./actions/restaurantActions";

const styles = {
	select: {
		width: "100%",
		maxWidth: 250,
	},
};

const Search = (props) => {
	const { handleSubmit, register, control } = useForm();
	const [users, setUser] = useState([]);
	const dispatch = useDispatch();
	const { push } = useHistory();
	const location = useLocation();
	// console.log(location);
	const { filterLists } = useSelector((state) => state.restaurants);

	async function searchData(e) {
		console.log(e);
		// push("/");
		const filterObj = {
			page: 1,
			Name: e.restaurant ? e.restaurant : false,
			Area: e.area ? e.area : false,
			Category: e.category ? e.category : false,
		};
		const params = new URLSearchParams(location.search);
		const keys = params.keys();
		// console.log(keys.length);
		const ff =
			typeof e.restaurant != "undefined"
				? params.set("name", e.restaurant)
				: typeof e.restaurant == "undefined"
				? params.delete("name")
				: "";
		e.area && params.set("area", e.area);
		push("/?" + params.toString());
		dispatch(getAllRestaurants(filterObj));
	}

	const loadOptions = async (inputText, callback) => {
		if (inputText.length > 2) {
			const { data } = await axios.post("/api/get-restaurant-name", {
				name: inputText,
			});
			console.log(data);
			callback(data.map((i) => ({ label: i.Name, value: i._id })));
		}

		/*const res = await fetch("https://jsonplaceholder.typicode.com/users");
		const json = await res.json();
		callback(json.map((i) => ({ label: i.name, value: i.id })));*/
	};

	return (
		<form className="form-inline" onSubmit={handleSubmit(searchData)}>
			<label htmlFor="name" className="mr-sm-2">
				Ontype
			</label>
			<div style={styles.select} className="mr-sm-2">
				<Controller
					as={AsyncSelect}
					value={users}
					placeholder="Start typing.."
					name="ontypename"
					isClearable
					control={control}
					loadOptions={loadOptions}
				/>
			</div>
			<label htmlFor="name" className="mr-sm-2">
				Restaurant
			</label>
			<input
				type="restaurant"
				className="form-control mb-2 mr-sm-2"
				placeholder="Restaurant name"
				id="restaurant"
				name="restaurant"
				ref={register({ required: false })}
			/>
			<label htmlFor="area" className="mr-sm-2">
				Area
			</label>
			<input
				type="text"
				className="form-control mb-2 mr-sm-2"
				placeholder="Area"
				id="area"
				name="area"
				ref={register({ required: false })}
			/>
			<label htmlFor="category" className="mr-sm-2">
				Category
			</label>
			<input
				type="text"
				className="form-control mb-2 mr-sm-2"
				placeholder="Category"
				id="category"
				name="category"
				ref={register({ required: false })}
			/>
			<button type="submit" className="btn btn-primary mb-2">
				Search
			</button>
		</form>
	);
};

export default Search;
