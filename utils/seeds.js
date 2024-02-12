// imports
const { User, Thought, Reaction } = require("../models");
const mongoose = require("mongoose");
const connection = require("../config/connection");

// seed
const users = [
  {
    username: "lernantino",
    email: "lernantino@gmail.com",
    thought: [],
  },
];

connection.once("open", async () => {
  console.log("Connected to server");

  // deletes any existing users and thoughts
  await User.deleteMany({});
  await Thought.deleteMany({});

  // adds the array to the database
  await User.collection.insertMany(users);

  // displays the seed data as a table in the console
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
