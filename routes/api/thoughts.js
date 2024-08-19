const router = require('express').Router();
const Thought = require('../../models/thought');
const User = require('../../models/user');

// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single thought by ID
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    // Add thought ID to user's thoughts
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a thought by ID
router.put('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a thought by ID
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    // Remove thought ID from user's thoughts
    await User.updateMany({ thoughts: thought._id }, { $pull: { thoughts: thought._id } });
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
