import 'dotenv/config';

export const configuration = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_URL: process.env.API_URL || 'http://localhost:5000',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://volunteer-bridge.com.ng',
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN ? String(process.env.ALLOWED_ORIGIN).split(',') : ['http://localhost:3000', 'https://volunteer-bridge.com.ng'],
    PORT: process.env.PORT || 5432,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'volunte1_user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'QBclIxMZXXaVzZixSAG3WBJfFr4J6mkw',
    DB_NAME: process.env.DB_NAME || 'volunte1_bridge',
    DB_DIALECT: process.env.DB_DIALECT || 'postgres',
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
    SMTP_HOST: process.env.SMTP_HOST || 'localhost',
    SMTP_PORT: process.env.SMTP_PORT || 587,
    SMTP_USER: process.env.SMTP_USER || '',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
    MAIL_FROM: process.env.MAIL_FROM || ''
}

export default configuration;