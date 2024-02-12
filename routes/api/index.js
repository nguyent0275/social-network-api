// imports
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// middleware
// setting up the path for the routes
// api/users/
// api/thoughts/
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
