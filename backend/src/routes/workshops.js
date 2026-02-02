const express = require('express');
const router = express.Router();
const { getNearbyWorkshops, getAllWorkshops } = require('../controllers/workshopController');

// GET /api/workshops/nearby?latitude=X&longitude=Y&radius=Z
router.get('/nearby', getNearbyWorkshops);

// GET /api/workshops
router.get('/', getAllWorkshops);

module.exports = router;
