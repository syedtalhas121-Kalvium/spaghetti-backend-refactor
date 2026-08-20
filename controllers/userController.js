const userService = require('../services/userService');

async function getUsers(req, res) {
  try {
    const users = await userService.getActiveUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createUser(req, res) {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'firstName, lastName and email are required' });
    }
    const existing = await userService.findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already in use' });
    const user = await userService.createUser({ firstName, lastName, email });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deactivateUser(req, res) {
  try {
    const user = await userService.deactivateUser(parseInt(req.params.id));
    res.json({ message: 'User deactivated', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getUsers, getUserById, createUser, deactivateUser };
