const Place = require('../models/Place');

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.json(places);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.createPlace = async (req, res) => {
  try {
    const { name, lat, lng, timing, fee, photo, city, tags } = req.body;
    if (!name || lat == null || lng == null) return res.status(400).json({ message: 'Name, lat, lng required' });
    const place = await Place.create({ name, lat, lng, timing, fee, photo, city, tags, createdBy: req.user.id });
    res.status(201).json(place);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.updatePlace = async (req, res) => {
  try {
    const updated = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Place not found' });
    res.json(updated);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.deletePlace = async (req, res) => {
  try {
    const deleted = await Place.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Place not found' });
    res.json({ message: 'Place deleted' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};
