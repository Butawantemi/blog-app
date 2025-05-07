import mongoose from 'mongoose';
import Blog from '../models/blog.model';
import { NextFunction, Request, Response } from 'express';

export class BlogControllers {
  fetchListOfBlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    let blogList;
    try {
      blogList = await Blog.find();
    } catch (error) {
      next(error);
    }
  
    if (!blogList) {
      res.status(404).json({ message: 'No blog found' });
      return;
    }
    res.status(200).json({ blogList });
    return;
  };
  
  addNewBlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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
  
      res.status(201).json({ newlyCreatedBlog });
      return;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ message: 'Failed to create blog', error });
      return;
    }
  };
  
  getABlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const singleBlog = Blog.findById(req.params.id);
      if (!singleBlog) {
        res.status(404).json({ message: 'Blog is not found' });
        return;
      }
      res.status(200).json({ singleBlog });
      return;
    } catch (error) {
      next(error);
    }
  };
  
  deleteABlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const id = req.params.id;
    try {
      const findCurrentBlog = await Blog.findByIdAndDelete(id);
      if (!findCurrentBlog) {
        res.status(404).json({ message: 'Blog not found' });
        return;
      }
      res.status(200).json({ message: 'Successful Deleted' });
      return;
    } catch (error) {
      next(error);
    }
  };
  
  updateABlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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
      res.status(500).json({ message: 'Unable to update' });
      return;
    }
    res.status(200).json({ currentBlogToUpdate });
    return;
  };
}
