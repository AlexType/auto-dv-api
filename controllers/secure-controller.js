const UserRequest = require('../models/UserRequest');

class SecureController {
  async userRequests (req, res) {
    try {
      return res.json(await UserRequest.find());
    } catch (error) {
      res.status(400).json({ message: 'UserRequest Error' });
    }
  }

  async updateUserRequest (req, res) {
    try {
      const { id, adminMark, called } = req.body;
      await UserRequest.findByIdAndUpdate(id, { adminMark, called });
      return res.json();
    } catch (error) {
      res.status(400).json({ message: 'UpdateUserRequest Error' });
    }
  }

  async deleteUserRequest (req, res) {
    try {
      await UserRequest.deleteOne(req.body.id);
      return res.json();
    } catch (error) {
      res.status(400).json({ message: 'DeleteUserRequest Error' });
    }
  }
}

module.exports = new SecureController();
