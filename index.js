import 'dotenv/config';

import express from 'express';
import connectToDB from './services/connection.js';
import userRouter from './routes/userRoute.js';
import channelRouter from './routes/channelRoute.js';
import authenticateUser from './services/middleware.js';
import videoRouter from './routes/videoRoute.js';
import commentRouter from './routes/commentRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Define new express instance
const app = express();

// Define Middleware
app.use(
  cors({
    origin:
      'https://you-tube-replica-frontend-abhishekroy22s-projects.vercel.app',
    credentials: true, // Ensure cookies and headers are allowed
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Define routes
app.get('/', (req, res) => {
  res.send('<h1>Server is running BRO!</h1>');
});

app.use('/api/user', userRouter);
app.use('/api/user', authenticateUser, channelRouter);
app.use('/api/user', authenticateUser, videoRouter);
app.use('/api/user', authenticateUser, commentRouter);

// Connecting to database & Listining to the port
connectToDB(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT} & connected to db`);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
