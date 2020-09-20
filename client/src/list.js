import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "./actions/restaurantActions";
import Pagination from "./Pagination";

function Listing(props) {
	console.count("list");
	const location = useLocation();
	const currPage = new URLSearchParams(location.search).get("page");

	// console.log(qParams);
	const { lists, loading } = useSelector((state) => state.restaurants);
	const dispatch = useDispatch();
	// console.log(lists);
	// const { pager } = lists;

	useEffect(() => {
		const currentPage = currPage !== null ? currPage : "1";
		dispatch(getAllRestaurants({ page: currentPage }));
	}, [currPage]);

	let searchResults;
	if (lists === null && loading === false) {
		searchResults = (
			<tr>
				<td colSpan="3">No Data Found</td>
			</tr>
		);
	} else if (lists === null || loading === true) {
		searchResults = (
			<tr>
				<td colSpan="3">Loading...</td>
			</tr>
		);
	} else {
		searchResults = lists.pageOfItems.map((item) => {
			return (
				<tr key={item._id}>
					<td>{item.Name}</td>
					<td>{item.Category}</td>
					<td>{item.Area}</td>
				</tr>
			);
		});
	}

	let pagination;
	// for pagination https://www.npmjs.com/package/react-paginate
	if (lists !== null) {
		const { pager } = lists;
		pagination = <Pagination pager={pager} />;
	} else {
	}

	return (
		<div className="row">
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Restaurant</th>
						<th scope="col">Category</th>
						<th scope="col">Area</th>
					</tr>
				</thead>
				<tbody>{searchResults}</tbody>
			</table>
			{pagination}
		</div>
	);
}

export default Listing;
