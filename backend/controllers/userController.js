const { validationResult } = require('express-validator');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      users: users.map(user => user.toJSON())
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, first_name, last_name, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUserByUsername = await User.findByUsername(username);
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Crear nuevo usuario
    const newUser = await User.create({
      username,
      email,
      password,
      first_name,
      last_name,
      role: role || 'user'
    });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser.toJSON()
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { username, email, password, first_name, last_name, role } = req.body;

    // Verificar si el usuario existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verificar si el username ya existe (si se está cambiando)
    if (username && username !== existingUser.username) {
      const userWithUsername = await User.findByUsername(username);
      if (userWithUsername) {
        return res.status(400).json({ error: 'Username already exists' });
      }
    }

    // Verificar si el email ya existe (si se está cambiando)
    if (email && email !== existingUser.email) {
      const userWithEmail = await User.findByEmail(email);
      if (userWithEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    // Actualizar usuario
    const updatedUser = await User.update(id, {
      username,
      email,
      password,
      first_name,
      last_name,
      role
    });

    res.json({
      message: 'User updated successfully',
      user: updatedUser.toJSON()
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // No permitir que un usuario se elimine a sí mismo
    if (req.user.id == id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const deleted = await User.delete(id);
    if (deleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};