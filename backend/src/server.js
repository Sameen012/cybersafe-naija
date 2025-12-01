import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB, sequelize } from './models/index.js';
import scamRoutes from './routes/scamRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'CyberSafe Naija backend is live' });
});

app.use('/api/scams', scamRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api', apiRoutes);

const startServer = async () => {
  await connectDB();
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`CyberSafe Naija API listening on port ${PORT}`);
  });
};

startServer();
