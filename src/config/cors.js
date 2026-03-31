import { configuration } from "./env.js";

const allowedOrigins = [
  ...(configuration.ALLOWED_ORIGIN
    ? configuration.ALLOWED_ORIGIN.split(",").map((origin) => origin.trim())
    : []),
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

export const corsOptions = {
  origin(origin, callback) {
    console.log("Origin:", origin);
    console.log("Allowed Origins:", allowedOrigins);

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
