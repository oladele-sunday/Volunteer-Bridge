import { configuration } from './env.js';

const allowedOrigins = Array.isArray(configuration.ALLOWED_ORIGIN)
  ? configuration.ALLOWED_ORIGIN
  : [configuration.ALLOWED_ORIGIN].filter(Boolean);

allowedOrigins.push(
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5173",
  "http://localhost:8081",
  "http://127.0.0.1:5173",
  "https://volunteer-bridge-alpha.vercel.app"
);

export const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
