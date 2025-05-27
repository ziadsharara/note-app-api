import { Note } from './../../../DB/Models/note.model.js';
import { User } from './../../../DB/Models/user.model.js';

export const createNote = async (req, res) => {
  // data
  const { content } = req.body;
  const userId = req.user._id;

  // check user
  const user = await User.findById(userId);
  if (!user) return res.json({ success: false, message: 'User not found!' });

  // create note
  const note = await Note.create({ content, userId });

  return res.json({ success: true, results: note });
};

export const updateNote = async (req, res) => {
  // data >> id, isCompleted
  const { id } = req.params; // note id
  const { isCompleted } = req.body;
  const userId = req.user._id;

  // check if user exists
  const user = await User.findById(userId);
  if (!user) return res.json({ success: false, message: 'user not found!' });

  // query
  // const note = await Note.findByIdAndUpdate(id, { isCompleted }, { new: true });

  const note = await Note.findOneAndUpdate(
    { _id: id, userId },
    { isCompleted },
    { new: true }
  );

  if (!note) return res.json({ success: false, message: 'Note not found!' });

  return res.json({ success: true, results: note });
};

export const allNotes = async (req, res) => {
  // query
  const results = await Note.find({}, { content: 1, _id: 0 }).populate({
    path: 'userId',
    select: 'name email -_id',
  });
  return res.json({ success: true, results });
};

export const userNote = async (req, res) => {
  // date >> user id
  const { id } = req.params;

  // query
  const results = await Note.find({ userId: id }).populate('userId');
  return res.json({ success: true, results });
};
