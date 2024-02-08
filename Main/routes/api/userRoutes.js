const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController.js");

// /api/user
// setting up the base route for user, which has a get and post method
router
    .route("/")
    .get(getUsers)
    .post(createUser);

// api/user/userId
// setting up the id routes for user, which has a get, put, and delete method (these require an id)
router
    .route("/:userId")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
