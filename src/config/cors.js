import { configuration } from './env.js';

export const corsOptions = {
  origin(origin, callback) {
    if (!origin || configuration.ALLOWED_ORIGIN.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};