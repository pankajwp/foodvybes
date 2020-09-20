const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const paginate = require("jw-paginate");

const keys = require("./config/keys");

const port = process.env.PORT || 5000;
// parse application/json
app.use(bodyParser.json());

// Connecting to database
mongoose.connect(keys.mUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

require("./models/vancouver");

const Restaurant = mongoose.model("vancouver");

app.post("/api/get-restaurant-name", async (req, res) => {
	const name = req.body.name;
	const userRegex = new RegExp(name, "i");
	console.log(userRegex);
	const lists = await Restaurant.find({ Name: userRegex });
	return res.status(200).json(lists);
});

app.post("/api/express", async (req, res) => {
	// console.log(req.body);
	// const lists = await Restaurant.find({}).limit(10);
	try {
		// get page from query params or default to first page
		// console.log(req.body);
		const currentPage = parseInt(req.body.page) || 1;
		// get pager object for specified page
		const pageSize = 10;
		let start = 0;

		if (currentPage > 1) {
			start = (currentPage - 1) * pageSize;
		}

		const filterObj = {};
		// console.log(typeof req.body.Category);
		const filterKeys = Object.keys(req.body);
		// console.log(filterKeys);
		filterKeys.forEach((val, index) => {
			if (val === "Category" && req.body.Category !== false) {
				const regexCat = new RegExp(req.body.Category, "i");
				filterObj.Category = regexCat;
			}
			if (val === "Name" && req.body.Name !== false) {
				const regexName = new RegExp(req.body.Name, "i");
				filterObj.Name = regexName;
			}

			if (val === "Area" && req.body.Area !== false) {
				const regexArea = new RegExp(req.body.Area, "i");
				filterObj.Area = regexArea;
			}
		});
		// console.log(filterObj);
		const restaurantList = await Restaurant.find(filterObj)
			.skip(start)
			.limit(pageSize);
		// console.log(restaurantList);
		const totalRestaurant = await Restaurant.countDocuments(filterObj);

		const pager = paginate(totalRestaurant, currentPage, pageSize);
		// console.log(pager);
		// get page of items from items array
		const pageOfItems = restaurantList;
		if (restaurantList.length > 0) {
			return res.status(200).json({ pager, pageOfItems });
		} else {
			return res.status(400).json({ errors: "No restaurant found." });
		}
	} catch (err) {
		res.status(400).json({ error: "App Error" });
	}
});

/*if (process.env.NODE_ENV === "production") {
	// set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}*/

app.listen(port, () => console.log(`Server is running on ${port}`));
