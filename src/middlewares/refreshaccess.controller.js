import jwt from 'jsonwebtoken';
import User from '../modules/user.module.js';

export const verifyTokens = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.headers['x-refresh-token'];

  if (!authHeader) return res.status(401).json({ message: 'No access token' });

  const accessToken = authHeader.split(' ')[1];

  try {
    // ✅ Try to verify access token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    console.log('123');
    req.user = decoded;
    return next();
  } catch (err) {
    // 🔁 If expired, try to use refresh token
    if (err.name === 'TokenExpiredError' && refreshToken) {
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET,
        );
        const user = await User.findById(decodedRefresh.id);

        if (!user || user.refreshtoken !== refreshToken)
          return res.status(403).json({ message: 'Invalid refresh token' });
        // 🆕 Create new access token
        const newAccessToken = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '15m' },
        );

        // Send new token back to frontend
        res.setHeader('x-access-token', newAccessToken);
        req.user = { id: user._id, role: user.role };

        return next();
      } catch {
        return res
          .status(403)
          .json({ message: 'Invalid or expired refresh token' });
      }
    }

    return res.status(403).json({ message: 'Invalid or expired access token' });
  }
};
