// 1. Load environment variables from the .env file (keeps the API key secret)
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// 2. Serve the frontend files (index.html, style.css, script.js) from /public
app.use(express.static(path.join(__dirname, 'public')));

// 3. Our own API route: GET /api/weather?city=Bhopal
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;

  // Validate input
  if (!city || city.trim() === '') {
    return res.status(400).json({ error: 'Please enter a city name.' });
  }

  try {
    // 4. Call the OpenWeatherMap API from the server (the key never reaches the browser)
    const url =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      encodeURIComponent(city.trim()) +
      '&appid=' + API_KEY +
      '&units=metric';

    const response = await fetch(url);
    const data = await response.json();

    // 5. Handle errors coming back from the weather API
    if (response.status === 401) {
      return res.status(500).json({ error: 'Invalid API key. Check your .env file.' });
    }
    if (response.status === 404) {
      return res.status(404).json({ error: 'City not found. Check the spelling.' });
    }
    if (!response.ok) {
      return res.status(502).json({ error: 'Weather service error. Try again later.' });
    }

    // 6. Send back only the fields the frontend needs
    res.json({
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Try again later.' });
  }
});

// 7. Start the server
app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});
