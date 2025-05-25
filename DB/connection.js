import mongoose from 'mongoose';

export const connectDB = async () =>
  await mongoose
    .connect('mongodb://localhost:27017/noteApp')
    .then(() => console.log('DB connected!'))
    .catch(error => console.log('Error: ', error));
