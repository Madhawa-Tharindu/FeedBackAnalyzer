import { Router } from "express";
const router = Router();

import {
  addNewUser,
  getUserById,
  updateUser,
  getAllUsers,
  deleteUserById
} from "../controllers/userinfo.controller.js";

import {
  verifyUser
} from "../controllers/auth.controller.js";

router.route("/").post(addNewUser);
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUserById);

export default router;
