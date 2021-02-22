const db = require(`../db`);
const Users = db.Users;

/* lisab kasutaja Users hulka
module.exports = async function (req, res) {
  try {
    await Users.create(req.body)
    res.status(200).json({ message: 'Successs!' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
} */

const User = require(`../models/users.model`);

exports.registerNewUser = async (req, res) => {
  try {
    let user = await User.find({ email: req.body.email });
    if (user.length >= 1) {
      return res.status(409).json({
        message: "email already in use",
      });
    }
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    let data = await user.save();
    const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
/* exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.getUserDetails = async (req, res) => {
  await res.json(req.userData);
}; */
