import { FlatController } from './../../controllers/FlatController';
import express from 'express';

const router = express.Router();
const flat_controller = new FlatController;

router.get('/:id', flat_controller.getFlatById);
router.post('/', flat_controller.createFlat);
router.put('/', flat_controller.updateFlat)

export default router;
