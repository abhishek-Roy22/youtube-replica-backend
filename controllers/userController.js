import User from '../model/userSchema.js';
import { generateToken } from '../services/generateToken.js';

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

    // create token
    const token = generateToken(newUser);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 43200000,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { userName, email },
    });
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
    const { token, user } = await User.matchPassword(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 43200000,
    });

    res.status(200).json({
      message: 'Login successful',
      user: { userName: user.userName, email: user.email },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
