import { Router } from 'express';
import {
  fetchListOfBlog,
  addNewBlog,
  deleteABlog,
  updateABlog,
} from '../controllers/blog.controller';

const router = Router();

router.get('/', fetchListOfBlog);
router.post('/', addNewBlog);
router.delete('/:id', deleteABlog);
router.put('/:id', updateABlog)

export default router;
