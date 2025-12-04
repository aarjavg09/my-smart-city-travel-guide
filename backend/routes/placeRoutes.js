const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const auth = require('../middleware/auth');

router.get('/', placeController.getPlaces);
router.post('/', auth('admin'), placeController.createPlace);
router.put('/:id', auth('admin'), placeController.updatePlace);
router.delete('/:id', auth('admin'), placeController.deletePlace);

module.exports = router;
