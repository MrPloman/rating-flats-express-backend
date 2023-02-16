import { RatingController } from './../../controllers/RatingController';
import express from 'express';

const router = express.Router();
const rating_controller = new RatingController;

router.get('/:id', rating_controller.getRatingsByMailboxId);

export default router;
