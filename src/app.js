import express from 'express';
import mongoose from 'mongoose';
import quizRoutes from './routes/quizzes.js';
import 'dotenv/config'; 

const app = express();
//console.log("here I am ", process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Mongo connected!'))
  .catch(err => console.error('Mongo connection failed:', err));

app.use(express.json());
app.use('/api/quizzes', quizRoutes);

export default app;