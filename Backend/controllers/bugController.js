const Bug = require('../models/Bug');
const { validateBugInput } = require('../utils/validation');

/**
 * @desc    Get all bugs
 * @route   GET /api/bugs
 * @access  Public
 */
const getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json(bugs);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create a bug
 * @route   POST /api/bugs
 * @access  Public
 */
const createBug = async (req, res, next) => {
  try {
    const { errors, isValid } = validateBugInput(req.body);
    
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const bug = new Bug(req.body);
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update a bug
 * @route   PUT /api/bugs/:id
 * @access  Public
 */
const updateBug = async (req, res, next) => {
  try {
    const { errors, isValid } = validateBugInput(req.body);
    
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    res.status(200).json(bug);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a bug
 * @route   DELETE /api/bugs/:id
 * @access  Public
 */
const deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    res.status(200).json({ message: 'Bug removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBugs,
  createBug,
  updateBug,
  deleteBug
};