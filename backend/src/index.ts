import { Hono } from 'hono';
import userRouter from './routes/user.routes';
import blogRouter from './routes/blog.routes';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
	Variables : {
		userId: string,
		prisma: any
	}
}>();

app.use('*', async (c, next) => {
	const prisma = new PrismaClient({
		datasources:{
			db:{
				url: c.env.DATABASE_URL
			}
		}
	}).$extends(withAccelerate());

	c.set('prisma', prisma)
	await next();
})

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
