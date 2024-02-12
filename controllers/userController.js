const { ObjectId } = require("mongoose").Types;
const { User, Thoughts } = require("../models");

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
        // excludes version number and includes the thoughts array of the users
        .select("-__v")
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
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
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
  // BONUS: Remove a user's associated thoughts when deleted.
  async deleteUser(req, res) {
    try {
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
  // find a user by its id and adds a friend by their id
  async addFriend(req, res) {
    try {
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
  // finds a user by its id and deletes assosciated friend by id by pulling from the array
  // findOneAndDelete would delete the user, we just want to update their friends list and keep the user
  async deleteFriend(req, res) {
    try {
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
