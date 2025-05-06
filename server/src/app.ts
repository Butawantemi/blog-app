import express from 'express';
import blogRoutes from './routes/blog.router'
import { errorHandler } from './middlewares/errorHandler';
import connectToDB from './config/mongoose'

const app = express();
connectToDB()
app.use(express.json());
/* app.use('/api/items', itemRoutes); */
app.use('/api/blog', blogRoutes)

app.use(errorHandler);

export default app;
