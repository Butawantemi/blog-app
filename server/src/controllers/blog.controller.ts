import mongoose from 'mongoose';
import Blog from '../models/blog';
import { NextFunction, Request, Response } from 'express';

export const fetchListOfBlog = async (req: Request, res: Response, next: NextFunction) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (error) {
    next(error);
  }

  if (!blogList) {
    return res.status(404).json({ message: 'No blog found' });
  }
  return res.status(200).json({ blogList });
};

export const addNewBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newlyCreatedBlog = new Blog({
    title,
    description,
    date: currentDate,
  });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await newlyCreatedBlog.save({ session });
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ newlyCreatedBlog });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: 'Failed to create blog', error });
  }
};

export const deleteABlog = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    return res.status(200).json({ message: 'Successful Deleted' });
  } catch (error) {
    next(error);
  }
};

export const updateABlog = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { title, description } = req.body;

  let currentBlogToUpdate;
  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true },
    );
  } catch (error) {
    next(error);
  }

  if (!currentBlogToUpdate) {
    return res.status(500).json({ message: 'Unable to update' });
  }
  return res.status(200).json({ currentBlogToUpdate });
};

export const heyThere = () => {
    return "message"
}