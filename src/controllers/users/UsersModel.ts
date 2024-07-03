import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  salt: string;
  roles: string;
}

const UserSchema: Schema = new Schema({
  _id: { type: String, required: true, default: () => crypto.randomUUID(), unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  roles: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
  if (!this._id) {
    this._id = crypto.randomUUID();
  }
  next();
});

export const UsersModel = mongoose.model<IUser>("User", UserSchema);









