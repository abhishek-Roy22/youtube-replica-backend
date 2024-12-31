import 'dotenv/config';

import express from 'express';
import connectToDB from './services/connection.js';
import userRouter from './routes/userRoute.js';

// Define new express instance
const app = express();

// Define Middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Define routes
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.use('/api/user', userRouter);

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
