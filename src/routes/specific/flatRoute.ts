import express from 'express';
const router = express.Router();
const flat_controller = require('../../controllers/FlatController.ts');

router.get('/:id', flat_controller.getFlatById);
router.post('/', flat_controller.createFlat);
export default router;
