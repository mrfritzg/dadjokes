//User Data from Model from MongoDB
import User from "../models/UserModel.js";

import { StatusCodes } from "http-status-codes";

import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

//register controller
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  req.body.password = await hashPassword(req.body.password);

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user has been created" });
};

// login controller
export const login = async (req, res) => {
  //find user based on the unique email address
  const user = await User.findOne({ email: req.body.email });

  // the comparePassword function will check if the hashed
  // pwds are correct
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  // creates the token
  const token = createJWT({ userId: user._id, role: user.role });

  // expiration for the cookie -- 1 day
  const oneDay = 1000 * 60 * 60 * 24;

  // creating the cookie
  res.cookie("token", token, {
    httpOnly: true,
    // the cookie will also expire 1 day from now in milliseconds
    expires: new Date(Date.now() + oneDay),
    // https will only be used in production
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

// Logout Controller
export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    // set the cookies expiration to the current time so that
    // it expires right away
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
