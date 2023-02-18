import { RatingController } from './../../controllers/RatingController';
import express from 'express';

const router = express.Router();
const rating_controller = new RatingController;

router.get('/:flatId', rating_controller.getAllRatingsByFlatId);
router.post('/', rating_controller.createRatingOfFlat);
router.put('/', rating_controller.updateRatingOfFlat)

export default router;
