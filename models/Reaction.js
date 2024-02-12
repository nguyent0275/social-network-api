const { Schema, Types } = require("mongoose");

// schema for reactions, not a real model
const reactionSchema = new Schema(
  {
    // saved as _id
    reactionId: {
      // Use Mongoose's ObjectId data type
      // Default value is set to a new ObjectId
      type: Schema.Types.ObjectId,
      defaut: () => new Types.ObjectId(),
    },
    reactionBody: {
      // String
      // Required
      // 280 character maximum
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = reactionSchema;
