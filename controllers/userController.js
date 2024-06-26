import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Joke from "../models/JokeModel.js";
import cloudinary from "cloudinary";
// import { formatImage } from "../middleware/multerMiddleware.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  // sends back the user w/o password
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jokes = await Joke.countDocuments();
  res.status(StatusCodes.OK).json({ users, jokes });
};

export const updateUser = async (req, res) => {
  // console.log(req.file);
  const newUser = { ...req.body };
  delete newUser.password;

  // if a image file is being sent
  //  upload image file to cloudnary
  //  then -- delete it from local storage after upload
  if (req.file) {
    const file = formatImage(req.file);

    const response = await cloudinary.v2.uploader.upload(file);

    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  // if a image file is already uploaded in cloudinary,
  // delete the old one in order to save money from cloudinary
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
