import mongoose from 'mongoose';
import { Schema, Types, model } from 'mongoose';

// Schema
const noteSchema = Schema(
  {
    content: String,
    isCompleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
// Model
export const Note = model('Note', noteSchema);
