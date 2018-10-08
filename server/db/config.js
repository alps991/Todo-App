const env = process.env.NODE_ENV || "development";

if (env == "development") {
    process.env.PORT = 3000;
    process.env.MONGODB_URL = 'mongodb://localhost:27017/Todo';
} else if (env == "test") {
    process.env.PORT = 3000;
    process.env.MONGODB_URL = 'mongodb://localhost:27017/TodoTest';
}