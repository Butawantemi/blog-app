import express from 'express';
import blogRoutes from './routes/blog.router'
import { errorHandler } from './middlewares/errorHandler';
import connectToDB from './config/mongoose'
import cors from 'cors'

/* const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow sending cookies
    optionsSuccessStatus: 204, // Some legacy browsers choke on 204
  }; */

const app = express();
connectToDB()
app.use(express.json());
app.use(cors())
app.use('/api/blogs', blogRoutes)

app.use(errorHandler);

export default app;
