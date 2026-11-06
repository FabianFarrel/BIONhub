import mongoose, { Schema, Document, Types, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  favorites: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  matchPassword(plain: string): Promise<boolean>;
  toSafeJSON(): Record<string, unknown>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 60,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // never return the hash by default
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Content' }],
  },
  { timestamps: true }
);

// Hash the password before saving, only when it changed.
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare a plain password against the stored hash.
userSchema.methods.matchPassword = function matchPassword(plain: string): Promise<boolean> {
  return bcrypt.compare(plain, this.password);
};

// Strip sensitive fields when converting to JSON.
userSchema.methods.toSafeJSON = function toSafeJSON(): Record<string, unknown> {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
