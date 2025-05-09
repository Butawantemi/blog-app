import { Router } from 'express';
import { BlogControllers } from '../controllers/blog.controller'

const router = Router();
const blogControllers = new BlogControllers()

router.get('/', blogControllers.fetchListOfBlog);
router.get('/:id', blogControllers.getABlog);
router.post('/add', blogControllers.addNewBlog);
router.put('/update/:id', blogControllers.updateABlog);
router.delete('/delete/:id', blogControllers.deleteABlog);



export default router;
