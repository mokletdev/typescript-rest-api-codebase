import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String, minlength: 6 }
});

const User = mongoose.model('user', UserSchema, 'user');

export default User;
