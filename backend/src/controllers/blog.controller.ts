import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

export const createBlog = async (c:Context) => {
  try {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const blog = await prisma.post.crea
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500); // here since error type is unknown we have to cast it to Error to access message inside it
  }
}