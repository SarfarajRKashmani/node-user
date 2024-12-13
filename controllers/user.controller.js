const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    let isExists = await User.findOne({ email: email });
    if (isExists) {
      return res.send("users already Exists");
    } else {
      let user = await User.create(req.body);
      return res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const getUser = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUserById = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findById(userId);
    res.status(202).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let isExists = await User.findOne({ email: email });
  if (!isExists) {
    return res.send("user not found");
  }
  if (isExists.password != password) {
    return res.send("invalid password");
  }

  res.cookie("userId", isExists.id);
  // return res.send("logged in");
  return res.redirect("/")
};
// pages
const getLoginPage = (req, res) => {
  res.render("login");
};
const getSignupPage = (req, res) => {
  res.render("signup");
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  getLoginPage,
  getSignupPage,
  login,
};