import { usersMiddleware } from "../../middlewares/usersMiddleware";
import { RatingController } from "./../../controllers/RatingController";
import express from "express";

const router = express.Router();
const rating_controller = new RatingController();
const middleware_users = new usersMiddleware();

router.get("/:id", rating_controller.getRatingById);
router.get("/flat/:flatId", rating_controller.getAllRatingsByFlatId);
router.post("/", middleware_users.sesionStatus, middleware_users.userPermissions, rating_controller.createRatingOfFlat);
router.put("/", middleware_users.sesionStatus, rating_controller.updateRating);
router.put("/:flatId", rating_controller.updateAverageRatingOfFlat);

export default router;
