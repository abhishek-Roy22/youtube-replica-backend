import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { generateToken } from '../services/generateToken.js';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://cdn4.vectorstock.com/i/1000x1000/46/73/person-gray-photo-placeholder-man-material-design-vector-23804673.jpg',
    },
    channels: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
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
  return { token, user };
});

const User = model('User', userSchema);
export default User;
