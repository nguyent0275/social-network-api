const { Thought, User } = require("../models");

module.exports = {
  // GET to get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
  // GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      // if there is no thought found, will return a 404 with custom message
      if (!thought) {
        return res.status(404).json({ message: "No thought with that Id" });
      } else {
        res.status(200).json(thought);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
  // POST to create a new thought 
  async createThought(req, res) {
    try {
      // creates the thought
      const thought = await Thought.create(req.body);
      // finds user by their id
      // uses $addToSet to thought to the specified user's thought array, ($addToSet prevents duplicates from being added)
      // validate the changes and returns the new object to the user
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
      res.status(200).json({ thought, user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
  // PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      // finds the thought by its id value
      // updates it according to the req.body
      // validates the changes and returns the new object to the user
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      } else {
        res.status(200).json(thought);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
  // DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      // finds a thought by its id value and deletes it 
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      } else {
        res.status(200).json({ message: "Thought has been deleted" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
  // add reaction to a thought
  async addReaction(req, res) {
    try {
      // finds a thought by its id value
      // adds a reaction to the array based off the request body
      // validates the update and returns the new object
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true}
      );

      if (!reaction) {
        return res.status(404).json({ message: "No thought with that ID" });
      } else {
        res.status(200).json(reaction);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
  // delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      // finds a thought by its _id value (parent)
      // finds a reaction by its _id value (child)
      // removes the reaction and then validates changes and returns new object
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        res.status(404).json({ message: "No thought with that ID" });
      } else {
        res.status(200).json(reaction);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
};
