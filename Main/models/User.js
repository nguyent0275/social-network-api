const { Schema, model } = require("mongoose");

var validateEmail = function (email) {
  // using regex to validate email inputs
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// schmea to create the User model
const userSchema = new Schema({
  // username
  // String
  // Unique
  // Required
  // Trimmed
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // email
  // String
  // Required
  // Unique
  // Must match a valid email address (look into Mongoose's matching validation
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please enter a valid email address"],
  },
  // thoughts
  // Array of _id values referencing the Thought model
  thoughts: [thoughtsSchema],
  // friends
  // Array of _id values referencing the User model (self-reference)
  friends: [friends],
});

const User = model("user", userSchema);

module.exports = User;
