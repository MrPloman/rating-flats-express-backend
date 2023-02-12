import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send("Fetching all flats");
});

router.post('/', (_req, res) => {
    res.send("Creating a flat");
});
export default router;
