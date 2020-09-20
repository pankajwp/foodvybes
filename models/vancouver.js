const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchemas = new Schema(
	{
		Name: String,
		Area: String,
		Address: String,
		Category: String,
		Price: String,
		Timings: String,
		Phone: String,
	},
	{ collection: "vancouver" }
);

// adding model name
mongoose.model("vancouver", restaurantSchemas);
