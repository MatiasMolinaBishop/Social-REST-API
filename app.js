require("dotenv").config();
//Connects to the database
require("./db");
const express = require("express");
const app = express();
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const postsRoutes = require("./routes/posts.routes");

app.use("/api", indexRoutes);
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postsRoutes);

//To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
