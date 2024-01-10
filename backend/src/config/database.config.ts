import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const databaseSchema = z.object({
  type: z.string().default('postgres'),
  host: z.string(),
  port: z.coerce.number().default(5432),
  username: z.string().min(1),
  password: z.string(),
  database: z.string().min(1),
  ssl: z.string().transform((value) => value.toLowerCase() === 'true'),
});

export default registerAs('database', () => {
  const config = databaseSchema.parse({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: process.env.DATABASE_SSL,
  });
  return { ...config };
});
