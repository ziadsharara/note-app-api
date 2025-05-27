import express from 'express';
import { connectDB } from './DB/connection.js';
import { appRouter } from './src/app.router.js';
import dotenv from 'dotenv';
dotenv.config(); // path
const app = express();
const port = process.env.PORT;

// Connect DB
connectDB();

// Router
appRouter(app, express);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
