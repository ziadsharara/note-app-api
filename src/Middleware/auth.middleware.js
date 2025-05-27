import jwt from 'jsonwebtoken';
import { User } from './../../DB/Models/user.model.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    // token
    let { token } = req.headers;

    // check if the token exists in blacklist

    if (!token) {
      return res.json({ success: false, message: 'Token is required!' });
    }

    // check prefix
    if (!token.startsWith(process.env.BEARERKEY)) {
      return res.json({ success: false, message: 'Token is invalid!' });
    }

    // reassign token
    token = token.split(process.env.BEARERKEY)[1];

    // decode
    const payload = jwt.verify(token, process.env.TOKENKEY);

    // check user existence
    const user = await User.findById(payload._id).select('email');
    if (!user) {
      return res.json({ success: false, message: 'User not found!' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
