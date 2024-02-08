const router = require("express").Router();
// imporitng all the controllers
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtsController.js");

// setting up the base route for thoughts, which has a get and post method
router
    .route("/")
    .get(getThoughts)
    .post(createThought);

// setting up the id routes for thoughts, which has a get, put, and delete method (these require an id)
router
  .route("/thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
