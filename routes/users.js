// const express = require('express');
// const { getUsers, updateUser, deleteUser } = require('../controllers/userController');
// const { protect, admin } = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.get('/', protect, admin, getUsers);
// router.put('/:id', protect, admin, updateUser);
// router.delete('/:id', protect, admin, deleteUser);

// module.exports = router;


const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all users (Admin only)
router.get('/', authMiddleware('admin'), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user (Admin only)
router.put('/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user (Admin only)
router.delete('/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
