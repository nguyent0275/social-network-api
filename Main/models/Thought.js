const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtText: {
    // String
    // Required
    // Must be between 1 and 280 characters
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    // String
    // Required
    type: String,
    required: true,
  },
  //   Array of nested documents created with the reactionSchema
  reactions: [reactions],
  createdAt: {
    // Date
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query
    type: Date,
    default: Date.now,
  },
});

const Thought = model("thoughts", thoughtSchema);

module.exports = Thought;
