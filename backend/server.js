require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/placeRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Smart City Backend Running'));

app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/itinerary', itineraryRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running → http://localhost:${PORT}`));
});
