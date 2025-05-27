import { User } from './../../../DB/Models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    // data >> body
    const { email, password, name, confirmPassword } = req.body;

    // check password
    if (password !== confirmPassword) {
      return res.json({ success: false, message: 'Password must match!' });
    }

    // check email
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.json({
        success: false,
        message: 'Email must be unique!',
      });
    }

    // hash password
    const hashPassword = bcryptjs.hashSync(
      password,
      parseInt(process.env.SALTROUNDS)
    );

    // Create
    const user = await User.create({ email, password: hashPassword, name });
    // console.log(user);

    // Response
    return res.json({
      success: true,
      message: 'User created successfully!',
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
};

export const login = async (req, res, next) => {
  // data
  const { email, password } = req.body;

  // check email
  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: 'Email not found!',
    });

  // check password
  // compareSync(passwordFromUser, HashedPasswordFromDB)
  const match = bcryptjs.compareSync(password, user.password); // true, false

  if (!match)
    return res.json({
      success: false,
      message: 'Invalid Password!',
    });

  // generate token
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.TOKENKEY,
    { expiresIn: '1d' }
  );

  // response
  return res.json({ success: true, token });
};

export const profile = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);

    return res.json({ success: true, results: user });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

export const deleteAccount = async (req, res, next) => {
  const email = req.user.email;

  // query
  const user = await User.findOneAndDelete({ email });

  if (!user) return res.json({ success: false, message: 'user not found!' });
  return res.json({
    success: true,
    message: 'Account deactivated successfully!',
  });
};

export const allUsers = async (req, res, next) => {
  // query
  // const results = await User.find({}, { password: 0 });
  const results = await User.find().select('email');
  return res.json({ success: true, results });
};
