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
} from "../controllers/jokeController.js";

// import { checkForTestUser } from "../middleware/authMiddleware.js";

//chain the routes
//same path different methods
router
  .route("/")
  .get(getAllJokes)
  .post(/*checkForTestUser, */ validateJokeInput, createJoke);

// router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJoke)
  .patch(/*checkForTestUser,*/ validateJokeInput, validateIdParam, updateJoke)
  .delete(/*checkForTestUser, */ validateIdParam, deleteJoke);

export default router;
