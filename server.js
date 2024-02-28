//for variables in .env file, best to put it on top/first line
import * as dotenv from "dotenv";
dotenv.config();

// The "express-async-errors" package is an Express.js middleware that helps handle errors that occur within asynchronous functions. It catches unhandled errors inside async/await functions and forwards them to Express.js's error handling middleware, preventing the Node.js process from crashing. It simplifies error handling in Express.js applications by allowing you to write asynchronous code without worrying about manually catching and forwarding errors.
import "express-async-errors";

// import mongoose
import mongoose from "mongoose";

// cookie parser
import cookieParser from "cookie-parser";

import express from "express";
const app = express();

// Status Codes for CRUD & route responses
import { StatusCodes } from "http-status-codes";

//morgan is a package that logs the requests made to the server
import morgan from "morgan";

// installing security middleware packages helmet & mongoSanitize
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

// setup env variables on morgan middleware
if (process.env.NODE_ENV === "development") {
  //setup middleware to use the morgan package with the 'use' method
  // morgan is a http request logger middleware for node.js
  app.use(morgan("dev"));
}

//import routers
import jokeRouter from "./routes/jokeRouter.js";

// middleware for error handling
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

// implementing security middleware packages helmet & mongoSanitize
app.use(helmet());
app.use(mongoSanitize());

// middleware
// to accept json data
app.use(express.json());

// implement the cookieparser as middleware in order to read the cookies that hold the JWT
app.use(cookieParser());

//middleware for routers
//jobRouter, add authenticateUser for all job routes, to protect all job routes
app.use("/api/v1/jokes", jokeRouter);

// simple route
app.get("/", (req, res) => {
  res.send("hello world");
});

//more middleware
// not found -- requests/routes for resources that don't exist
app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "not found" });
});

// for unexpected errors, usually for general valid requests
// using custom error handling middleware
app.use(errorHandlerMiddleware);

// Port
const port = process.env.PORT || 5100;

//DB connection
try {
  await mongoose.connect(process.env.MONGO_URL);
  // server is listening to port
  app.listen(port, () => {
    console.log("server is listening on port: " + port);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
