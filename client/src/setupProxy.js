const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
	app.use(
		"/api/*",
		createProxyMiddleware({
			target: "http://localhost:5000",
			changeOrigin: true,
		})
	);

	///////// testing
	// app.use(
	// 	"/confirm",
	// 	createProxyMiddleware({
	// 		target: "http://localhost:5000",
	// 		changeOrigin: true,
	// 	})
	// );

	app.use(
		"/auth/google",
		createProxyMiddleware({
			target: "http://localhost:5000",
			changeOrigin: false,
		})
	);

	app.use(
		"/account/*",
		createProxyMiddleware({
			target: "http://localhost:5000",
			changeOrigin: false,
		})
	);
};
