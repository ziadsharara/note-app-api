import { User } from './../../../DB/Models/user.model.js';

export const signup = async (req, res, next) => {
  try {
    // data >> body
    const { email, password, name, confirmPassword } = req.body;

    // check password
    if (password !== confirmPassword) {
      return res.json({ success: false, message: 'Password must match!' });
    }

    // check email
    // const isUser = await User.findOne({ email });
    // if (isUser) {
    //   return res.json({
    //     success: false,
    //     message: 'Email must be unique!',
    //   });
    // }

    // Create
    const user = await User.create({ email, password, name });
    // console.log(user);

    // Response
    return res.json({
      success: true,
      message: 'User created successfully!',
      user,
    });
  } catch (error) {
    if (error.keyPattern.email) {
      return res.json({
        success: false,
        message: 'Email must be unique!',
      });
    }

    return res.json({
      success: false,
      error,
    });
  }
};

export const login = async (req, res, next) => {
  // data
  const { email, password } = req.body;

  // query
  // const user = await User.findOne({ email, password });

  // if (!user)
  //   return res.json({
  //     success: false,
  //     message: 'Email or password is incorrect!',
  //   });

  // check email
  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: 'Email not found!',
    });

  // check password
  if (user.password !== password)
    return res.json({
      success: false,
      message: 'Invalid Password!',
    });

  return res.json({ success: true, result: user });
};

export const deleteAccount = async (req, res, next) => {
  // data
  const { email } = req.params;

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
