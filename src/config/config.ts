export default {
    jwtSecret: process.env.JWT_SECRET || "somesecretKey",
    DB: {
        URI: process.env.MONGO_URI || "mongodb://localhost/stackMEVN",
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}