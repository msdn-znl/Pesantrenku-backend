
const requiredEnvVars = ['PORT', 'ENVIRONMENT', 'HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DATABASE', 'ACCESS_SECRET', 'REFRESH_SECRET'];

requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

module.exports = {
    db: {
        host: process.env.HOST || '127.0.0.1' ,
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'jiroupat',
        database: process.env.DATABASE || 'pesantrenku'
    },
    jwt: {
        access: process.env.ACCESS_SECRET,
        refresh: process.env.REFRESH_SECRET
    },
    app: {
        port: process.env.PORT,
        env: process.env.ENVIRONMENT
    }
};
