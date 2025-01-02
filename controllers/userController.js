import User from '../model/userSchema.js';
import { verifyToken } from '../services/generateToken.js';

export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exist' });
    }

    const newUser = await User.create({
      userName,
      email,
      password,
    });
    return res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //  I define matchpassword function in User model.
    //  This function firstly find user associated with provided email.
    //  Then verify hashed password with user password.
    //  If everythig gose well this function return token, generated in generate token function.
    const token = await User.matchPassword(email, password);

    const payload = verifyToken(token);
    req.user = payload;
    return res
      .status(200)
      .json({ message: 'Login successful', user: payload, token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
