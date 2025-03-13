import { Hono } from 'hono';
import { authMiddleware } from '../controllers/auth.controller';
import {
  allBlogs,
  createBlog,
  getBlog,
  updateBlog,
  userBlogs,
} from '../controllers/blog.controller';

const blogRouter = new Hono();

// blogRouter.get('/:id', (c) => {
//   return c.text("Blog router working")
// })

blogRouter.use(authMiddleware);

blogRouter.get('/bulk', allBlogs);

blogRouter.post('/', createBlog);

blogRouter.get('/my-blogs', userBlogs);

blogRouter.get('/:id', getBlog);

blogRouter.put('/', updateBlog);

export default blogRouter;
