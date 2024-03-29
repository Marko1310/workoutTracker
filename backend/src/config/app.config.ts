import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const appSchema = z.object({
  port: z.coerce.number().default(3000),
  jwt: z.object({
    secret: z.string(),
  }),
  clientUrl: z.string(),
  serverPing: z.string().optional(),
});

export default registerAs('app', () => {
  const config = appSchema.parse({
    port: process.env.PORT,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    clientUrl: process.env.CLIENT_URL,
    serverPing: process.env.SERVER_PING,
  });
  return config;
});
