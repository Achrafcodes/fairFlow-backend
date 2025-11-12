import User from '../../modules/user.module.js';
import jwt from 'jsonwebtoken';
export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name) return res.status(400).json({ message: 'Name is required' });
    if (!email) return res.status(400).json({ message: 'email is required' });
    if (!password)
      return res.status(400).json({ message: 'password is required' });
    const user = await User.findOne({ email: email });

    if (user) return res.status(400).json({ message: 'email already in use!' });
    const PasswordValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (!PasswordValidator.test(password))
      return res.status(400).json({ message: 'waeak password' });

    const newuser = await User.create({ name, email, password, role });
    const accesstoken = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    const refreshToken = jwt.sign(
      { id: newuser._id },
      process.env.REFRESH_SECRET,
      {
        expiresIn: '15d',
      },
    );
    newuser.refreshtoken = refreshToken;
    await newuser.save();
    res.status(201).json({
      message: 'user Created !',
      newuser,
      accesstoken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
