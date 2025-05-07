import mongoose, { Schema, model } from 'mongoose';

interface IBlog {
  title: string;
  description: string;
  date: Date;
}

const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blog = model<IBlog>('Blog', blogSchema)

export default Blog;
