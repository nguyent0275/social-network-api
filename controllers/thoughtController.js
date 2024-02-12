const { Thought, User } = require("../models");

module.exports = {
  //     GET to get all thoughts
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
  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
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
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true }
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
