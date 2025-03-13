import { Hono } from "hono";

const blogRouter = new Hono();

blogRouter.get('/:id', (c) => {
  return c.text("Blog router working")
})

blogRouter.get('/bulk', (c) => {
  return c.text("Blog router working")
})

blogRouter.post('/', (c) => {
  return c.text("Blog router working")
})

blogRouter.put('/:id', (c) => {
  return c.text("Blog router working")
})

export default blogRouter;