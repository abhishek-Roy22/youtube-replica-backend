import User from '../model/userSchema.js';

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
    res.status(500).json({ error: error.message });
  }
};
