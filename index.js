import express from 'express';
import { connectDB } from './DB/connection.js';
import { appRouter } from './src/app.router.js';
const app = express();
const port = 5000;

// Connect DB
connectDB();

// Router
appRouter(app, express);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
