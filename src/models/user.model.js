import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Enter your email'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    phone: {
      type: Number,
      // required: [true, 'Enter phone number'],
    },
    password: {
      type: String,
      required: [true, 'Enter your password'],
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    userRole: {
      type: String,
      default: 'user',
      enum: ['admin', 'user'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    otpDetails: {
      otp: {
        type: Number,
      },
      expiresAt: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  // console.log(this);
  let user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    // override the cleartext password with the hashed one
    user.password = hash;
    next();
  });
});

export default model('User', userSchema);
