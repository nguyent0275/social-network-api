// imports
const router = require("express").Router();
const apiRoutes = require("./api");

// middleware
// /api
router.use("/api", apiRoutes);
router.use((req, res) => res.send("Wrong Route"));

// exports
module.exports = router;
