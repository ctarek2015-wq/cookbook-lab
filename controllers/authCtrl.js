const bcrypt = require("bcrypt");
const User = require("../models/users");
const SALT_ROUNDS = 10;

// SIGN UP

const signUp = async (req, res) => {
  res.render("auth/sign-up.ejs");
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.send("there are empty fields");
    }
    if (password !== confirmPassword) {
      return res.send("passwords do not match");
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.send("Invalid Credentials");
    }

    const hashedPw = await bcrypt.hashSync(password, SALT_ROUNDS);
    req.body.password = hashedPw;

    const user = await User.create(req.body);

    req.session.user = { user: user.name, _id: user._id };

    req.session.save(() => {
      res.redirect("/");
    });
  } catch (err) {
    res.redirect("/auth/sign-up");
  }
};

// SIGN IN

const signIn = async (req, res) => {
  res.render("auth/sign-in.ejs");
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send("there are empty fields");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.send("Invalid Credentials");
    }

    req.session.user = { user: user.name, _id: user._id };

    req.session.save(() => {
      res.redirect("/");
    });
  } catch (err) {
    res.redirect("/auth/sign-in");
  }
};

// SIGN OUT

const signOut = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

// EXPORTS

module.exports = {
  signUp,
  register,
  signIn,
  login,
  signOut,
};
