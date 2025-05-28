import { Schema, model, Types } from 'mongoose';
import mongoose from 'mongoose';

// Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      allowNull: false,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    // notes: [
    //   {
    //     type: Types.ObjectId,
    //     ref: 'Note',
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);
// Model
export const User = model('User', userSchema);
