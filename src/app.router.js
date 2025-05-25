import userRouter from './Modules/User/user.router.js';
import noteRouter from './Modules/Note/note.router.js';

export const appRouter = (app, express) => {
  // Routes
  app.use(express.json());

  // User
  app.use('/user', userRouter);

  // Note
  app.use('/note', noteRouter);
};
