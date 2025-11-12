import jwt from 'jsonwebtoken';
import User from '../../modules/user.module.js';

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'email is required!' });
  if (!password)
    return res.status(400).json({ message: 'password is requiered' });
  const user = await User.findOne({ email: email }).select('+password');
  if (!user)
    return res
      .status(404)
      .json({ message: 'no account was found with this email !' });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'incorrect password!' });
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: '15d',
  });
  user.refreshtoken = refreshToken;
  user.save();
  user.password = undefined;
  res.status(200).json({ message: 'connected!', user, accessToken });
};
