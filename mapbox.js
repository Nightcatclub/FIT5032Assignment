import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoicm9veWZ1eHVhbiIsImEiOiJjbTIzNms5dmQwMmx2MmxvZ21lajRmano0In0.sDqSOOqCachhIO5DEwyCLg'; 

app.post('/get-route', async (req, res) => {
  const { startLocation, endLocation } = req.body;
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLocation};${endLocation}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching route:', error);
    res.status(500).json({ error: 'Failed to fetch route' });
  }
});

app.post('/get-place-name', async (req, res) => {
  const { lng, lat } = req.body;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching place name:', error);
    res.status(500).json({ error: 'Failed to fetch place name' });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
