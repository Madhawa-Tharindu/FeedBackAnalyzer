import { Router } from "express";
const router = Router();

import {
  authenticateUser,
  getAllUsernames,
  verifyUser
} from "../controllers/auth.controller.js";

router.route("/").post(authenticateUser);
router.route("/").get(getAllUsernames);

export default router;
