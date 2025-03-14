import { CreateBlog, UpdateBlog } from '@incognito_dev/blog-zod';
import { Context } from 'hono';

export const createBlog = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const prisma = c.get('prisma');

    const body = await c.req.json();

    const result = CreateBlog.safeParse(body);
    if (!result.success) {
      return c.json(
        {
          message: 'Input is not valid',
          errors: result.error.format(),
        },
        409
      );
    }

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({
      blog,
    });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500); // here since error type is unknown we have to cast it to Error to access message inside it
  }
};

export const userBlogs = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const prisma = c.get('prisma');

    const blogs = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        firstName: true,
        Post: true,
      },
    });

    return c.json(blogs);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
};

export const allBlogs = async (c: Context) => {
  try {
    const prisma = c.get('prisma');

    const blogs = await prisma.post.findMany({
      where: {
        published: true,
      }, include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return c.json(blogs);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
};

export const getBlog = async (c: Context) => {
  try {
    const blogId = c.req.param('id'); // this returns object like {id: "3234234"}
    console.log('🚀 ~ getBlog ~ blogId:', blogId);
    const prisma = c.get('prisma');

    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        },
      },
    });

    return c.json(blog);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
};

export const updateBlog = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();

    const result = UpdateBlog.safeParse(body);
    if (!result.success) {
      return c.json(
        {
          message: 'Input is not valid',
          errors: result.error.format(),
        },
        409
      );
    }

    const blogId = body.id;

    const prisma = c.get('prisma');

    const updatedBlog = await prisma.post.update({
      where: {
        id: blogId,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });

    return c.json(updatedBlog);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
};
