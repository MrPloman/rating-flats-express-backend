import { RatingController } from './../../controllers/RatingController';
import express from 'express';

const router = express.Router();
const rating_controller = new RatingController;

router.get('/:id', rating_controller.getRatingById);
router.get('/flat/:flatId', rating_controller.getAllRatingsByFlatId);
router.post('/', rating_controller.createRatingOfFlat);
router.put('/', rating_controller.updateRating)
router.put('/:flatId', rating_controller.updateAverageRatingOfFlat)


export default router;
