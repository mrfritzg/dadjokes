import mongoose from "mongoose";
import day from "dayjs";

//Joke Data from Model from MongoDB
import Joke from "../models/JokeModel.js";

// Status Codes for CRUD & route responses
import { StatusCodes } from "http-status-codes";

// custom Error Class
import { NotFoundError } from "../errors/customErrors.js";

//Get All Jokes controller
export const getAllJokes = async (req, res) => {
  const jokes = await Joke.find({});
  res.status(StatusCodes.OK).json({ jokes });

  // destructure the parameters from the search
  // const { search, jokeLike, jokeDislike, sort } = req.query;

  // add createdBy as a filter to the find method
  // to only find jobs for the userId

  // const queryObject = {
  //   createdBy: req.user.userId,
  // };

  // if there is nothing in the search field,  return all jobs based on the
  // queryObject above -- which is based on the userId
  // if search is true -- add the search parameters for position/company

  // if (search) {
  //   queryObject.$or = [
  //     { position: { $regex: search, $options: "i" } },
  //     { company: { $regex: search, $options: "i" } },
  //   ];
  // }

  // for jobStatus & JobType -- if the parameters are true , i.e. present
  // & not equal to 'all', then add them to the
  // queryObject, if not then do the default
  // and return all jobs based on userId
  // which will return all jobs
  // even if 'all' is present it will return all jobs

  // if (jobStatus && jobStatus !== "all") {
  //   queryObject.jobStatus = jobStatus;
  // }

  // if (jobType && jobType !== "all") {
  //   queryObject.jobType = jobType;
  // }

  // sort options
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  // const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // const jokes = await Joke.find(queryObject)
  //   .sort(sortKey)
  //   .skip(skip)
  //   .limit(limit);

  // const totalJokes = await Joke.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalJokes / limit);

  // res
  //   .status(StatusCodes.OK)
  //   .json({ totalJokes, numOfPages, currentPage: page, jokes });
};

//POST Create joke Controller
export const createJoke = async (req, res) => {
  const joke = await Joke.create(req.body);
  res.status(StatusCodes.CREATED).json({ joke });

  // assign the userId from the JWT to the createdBy in
  // the request as you're creating the job

  // req.body.createdBy = req.user.userId;

  // res.status(StatusCodes.CREATED).json({ joke });
};

// Get-- a Single Joke Controller
export const getJoke = async (req, res) => {
  const joke = await Joke.findById(req.params.id);

  if (!joke) throw new NotFoundError(`no joke with id ${req.params.id}`);
  res.status(StatusCodes.OK).json({ joke });
};

// Patch -- Update Joke controller
export const updateJoke = async (req, res) => {
  const updatedJoke = await Joke.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedJoke) throw new NotFoundError(`no joke with id ${req.params.id}`);

  res.status(StatusCodes.OK).json({ msg: "joke modified", joke: updatedJoke });

  // res.status(StatusCodes.OK).json({ job: updatedJoke });
};

// DELETE Joke controller
export const deleteJoke = async (req, res) => {
  const removedJoke = await Joke.findByIdAndDelete(req.params.id);
  if (!removedJoke) throw new NotFoundError(`no joke with id ${req.params.id}`);

  res
    .status(StatusCodes.OK)
    .json({ message: "joke deleted", joke: removedJoke });

  //

  // res.status(StatusCodes.OK).json({ message: "joke deleted", joke: removedJoke });
};

// showStats controller
export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
