import { Router } from "express";
const router = Router();

import {
  addNewSentimentText,
  getSentimentTextById,
  updateSentimentText,
  getAllSentimentText,
  deleteSentimentTextById,
  getAllSentimentTextByUID,
  getTotalSentimentTxtCount,
  getPositiveSentimentTxtCount,
  getNegativeSentimentTxtCount,
  getNeutralSentimentTxtCount,
  getAllSentimentTxtCount
} from "../controllers/sentiment.controller.js";

import {
  verifyUser
} from "../controllers/auth.controller.js";

router.route("/").post(addNewSentimentText);
router.route("/").get(getAllSentimentText);
router.route("/get-by-id/:id").get(getSentimentTextById);
router.route("/:id").put(updateSentimentText);
router.route("/:id").delete(deleteSentimentTextById);
router.route("/filter/:id").get(getAllSentimentTextByUID);
router.route("/get-total-text").get(getTotalSentimentTxtCount);
router.route("/get-positive-text").get(getPositiveSentimentTxtCount);
router.route("/get-negative-text").get(getNegativeSentimentTxtCount);
router.route("/get-neutral-text").get(getNeutralSentimentTxtCount);
router.route("/get-all-text").get(getAllSentimentTxtCount);

export default router;
