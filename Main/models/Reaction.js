const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
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
      minlength: 280,
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
  {
    toJSON: {
        getters: true,
    },
    id: false
  }
);

module.exports = reactionSchema;