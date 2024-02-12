const router = require("express").Router();
// importing all the controllers
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// setting up the base route for thoughts, which has a get and post method
router.route("/").get(getThoughts).post(createThought);

// setting up the id routes for thoughts, which has a get, put, and delete method (these require an id)
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// route for adding a reaction to a thought via the thoughtID
router.route("/:thoughtId/reactions").post(addReaction);

// router for deleting a reaction by specifying the parent (thoughtId) and the child (reactionId)
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
