import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    // Check if authorization header exists
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      return c.json({ message: 'Unauthorized: No token provided' }, 401);
    }

    const token = authHeader.split(" ")[1];

    const payload = await verify(token, c.env.JWT_SECRET);
    c.set('userId', payload.id);

    await next();
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
}

export async function hashPassword(password: string): Promise<string> {
  // Convert password to bytes
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));
  
  // Hash the password with the salt using SHA-256
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new Uint8Array([...salt, ...passwordBuffer])
  );
  
  // Convert the hash to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Convert salt to hex for storage
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Return the salt and hash together
  return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(storedHash: string, password: string): Promise<boolean> {
  // Split the stored string to get the salt and hash
  const [saltHex, hashHex] = storedHash.split(':');
  
  // Convert salt from hex to bytes
  const salt = new Uint8Array(saltHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  
  // Convert password to bytes
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  
  // Hash the input password with the stored salt
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new Uint8Array([...salt, ...passwordBuffer])
  );
  
  // Convert to hex
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const inputHashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Compare hashes
  return inputHashHex === hashHex;
}