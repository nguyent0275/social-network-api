// imports
const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

// /api/user
// setting up the base route for user, which has a get and post method
router.route("/").get(getUsers).post(createUser);

// api/user/userId
// setting up the id routes for user, which has a get, put, and delete method (these require an id)
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// api/user/:userId/friends/:friendId
// setting up a route for adding and deleting a friend to a user by specifying the parent (userId) and the child (friendId)
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);
module.exports = router;
