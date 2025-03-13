import { Context } from 'hono';
import { hashPassword, verifyPassword } from './auth.controller';
import { sign } from 'hono/jwt';
import { SignInInput, SignUpInput } from '@incognito_dev/blog-zod';

export const userSignup = async (c: Context) => {
  try {
    // Create Prisma client with Accelerate
    const prisma = c.get('prisma');
    const body = await c.req.json();
    const result = SignUpInput.safeParse(body);
    if (!result.success) {
      return c.json(
        {
          message: 'Input is not valid',
          errors: result.error.format(),
        },
        409
      );
    }

    const existingUser =
      (await prisma.user.count({
        where: {
          email: body.email,
        },
      })) > 0;

    if (existingUser) {
      return c.json({ message: 'User already Exist' }, 409);
    }

    const hashedPassword = await hashPassword(body.password);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName,
      },
    });

    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);

    const { password, ...userWithoutPassword } = newUser;
    return c.json({
      userWithoutPassword,
      token,
    });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500); // here since error type is unknown we have to cast it to Error to access message inside it
  }
};

export const userSignin = async (c: Context) => {
  try {
    // Create Prisma client with Accelerate
    const prisma = c.get('prisma');

    const body = await c.req.json();

    const { success } = SignInInput.safeParse(body);
    if (!success) {
      return c.json({ message: 'Input is not valid' }, 409);
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!existingUser) {
      return c.json({ message: 'User Not Found' }, 411);
    }

    const passwordCorrect = await verifyPassword(
      existingUser.password,
      body.password
    );

    if (!passwordCorrect) {
      return c.json({ message: 'Password is Incorrect' }, 409);
    }

    const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET);

    return c.json({
      message: 'Sign In Successful',
      token,
    });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500); // here since error type is unknown we have to cast it to Error to access message inside it
  }
};

export const getUsers = async (c: Context) => {
  try {
    const prisma = c.get('prisma');

    const users = await prisma.user.findMany();

    return c.json(users);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500); // here since error type is unknown we have to cast it to Error to access message inside it
  }
};

export const userProfile = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const prisma = c.get('prisma');

    const profile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return c.json(profile);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500); // here since error type is unknown we have to cast it to Error to access message inside it
  }
};
