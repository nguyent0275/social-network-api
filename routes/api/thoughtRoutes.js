// imports
const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// /api/thoughts
// setting up the base route for thoughts, which has a get and post method
router.route("/").get(getThoughts).post(createThought);

// api/thoughts/thoughtId
// setting up the id routes for thoughts, which has a get, put, and delete method (these require an id)
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// api/thoughts/thoughtId/reactions
// route for adding a reaction to a thought via the thoughtID
router.route("/:thoughtId/reactions").post(addReaction);

// api/thoughts/thoughtId/reactions/reactionId
// router for deleting a reaction by specifying the parent (thoughtId) and the child (reactionId)
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
