const { ObjectId } = require("mongoose").Types;
const { User, Thoughts } = require("../models");

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      // finds all users
      const users = await User.find()
        // excludes version number
        .select("-__v")
        // includes their thoughts as an array attached to the user
        .populate("thoughts");
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err.toString());
    }
  },
  // GET a single user by its _id and populated thought and friend data
  async getSingleUser(req, res) {
    try {
      // finds a user by their id
      const user = await User.findOne({ _id: req.params.userId })
        // excludes verion number
        .select("-__v")
        // includes their thoughts as an array attached to the user
        .populate("thoughts");

      if (!user) {
        return res.status(400).json({ message: "No user with that ID" });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err.toString());
    }
  },
  // POST a new user:
  async createUser(req, res) {
    try {
      // creates a user based off the request body
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err.toString());
    }
  },
  // PUT to update a user by its _id
  async updateUser(req, res) {
    try {
      // find a user by teir _id value
      // updates the user based off the request body
      // validates the changes and returns the new object
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(400).json({ message: "No user with that ID" });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
  // DELETE to remove user by its _id
  async deleteUser(req, res) {
    try {
      // finds a user by their id and removes them
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      } else {
        res.status(200).json({ message: "User has been deleted" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
  // POST to add friends to a user based off their user id
  async addFriend(req, res) {
    try {
      // finds a user by their id (parent)
      // adds a friend to the array based of that friend's user id (child)
      // validates the changes and returns new object
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: "No user with that ID" });
      } else {
        res.status(200).json(friend);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
  // DELETE a friend from a user's friends array
  async deleteFriend(req, res) {
    try {
      // finds a user by their _id value (parent)
      // removes a friend from the that user's friends array based on the friend's userid (child)
      // validates the changes and returns the new object
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: "No friend with that ID" });
      } else {
        res.status(200).json(friend);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
};
