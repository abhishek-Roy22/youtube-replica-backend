import jwt from 'jsonwebtoken';

const secret_key = process.env.SECRET_KEY;

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    userName: user.userName,
    email: user.email,
  };

  const token = jwt.sign(payload, secret_key, { expiresIn: '1h' });
  return token;
};

export const verifyToken = (token) => {
  const payload = jwt.verify(token, secret_key);

  return payload;
};
