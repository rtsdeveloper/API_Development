import 'dotenv/config';
import express from 'express';
import { authRoutes, userRoutes } from './routes/index.js';
import { buildCors, authRequired } from './middleware/index.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(buildCors());

app.use('/', authRoutes);

app.use(authRequired);

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});


