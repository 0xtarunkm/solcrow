import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import userRoute from './routes/user.route';

const app = express();
const PORT = process.env.PORT || 8001;

// middlewares
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

// routes
app.use('/api/v1/user', userRoute);

app.use('/healthcheck', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'server is running',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
