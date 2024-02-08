const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
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
    reactions: [reactionSchema],
    createdAt: {
      // Date
      // Set default value to the current timestamp
      // Use a getter method to format the timestamp on query
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// returning the reactions array's length as a reactionCount
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thoughts", thoughtSchema);

module.exports = Thought;
