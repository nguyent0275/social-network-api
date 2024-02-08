const { Thought, User } = require("../models");

module.exports = {
  //     GET to get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err.toString());
    }
  },
  // GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      })

      if (!thought) {
        return res.status(404).json({ message: "No thought with that Id" });
      } else {
        res.status(200).json(thought);
      }
    } catch (err) {
      res.status(500).json(err.toString());
    }
  },
  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  // // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.toString());
    }
  },
  // PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      } else {
        res.json(thought);
      }
    } catch (err) {
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
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err.toString());
    }
  },
};
