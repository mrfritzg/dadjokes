import { Router } from "express";
const router = Router();
import {
  validateIdParam,
  validateJokeInput,
} from "../middleware/validationMiddleware.js";

import {
  getAllJokes,
  getJoke,
  createJoke,
  updateJoke,
  deleteJoke,
  showStats,
  getMyJokes,
} from "../controllers/jokeController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

//chain the routes
//same path different methods
router
  .route("/")
  .get(getAllJokes)
  .post(authenticateUser, validateJokeInput, createJoke);

// router.route("/stats").get(showStats);

// route to get jokes created by the user
router.route("/myjokes").get(authenticateUser, getMyJokes);

router
  .route("/:id")
  .get(validateIdParam, getJoke)
  .patch(authenticateUser, validateJokeInput, validateIdParam, updateJoke)
  .delete(authenticateUser, validateIdParam, deleteJoke);

export default router;
