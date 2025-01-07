import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};

export default authenticateUser;
