import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { generateToken } from '../services/generateToken.js';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// hashing password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // generate salt
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// verifying user
userSchema.static('matchPassword', async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const hashedPassword = user.password;

  const match = await bcrypt.compare(password, hashedPassword);

  if (!match) {
    throw new Error('Invalid Password');
  }

  const token = generateToken(user);
  return token;
});

const User = model('User', userSchema);
export default User;
