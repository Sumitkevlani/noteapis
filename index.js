import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import express from 'express';
import connectToDatabase from './database/db.js';
import { default as noteRoutes } from './routes/noteRoutes.js';
import { default as userRoutes } from './routes/userRoutes.js';


const app = express();
connectToDatabase();
app.use(express.json());
app.use(cookieParser());

app.use('/api/notes',noteRoutes);
app.use('/api/user',userRoutes);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// 6595831bf382926f2b3ce951