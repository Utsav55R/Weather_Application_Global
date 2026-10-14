# Weather App

A simple full stack weather app built with HTML/CSS/JS and Node.js + Express. No database.

## Setup

1. Install Node.js 18 or newer (needed for the built-in `fetch`).
2. Get a free API key from https://openweathermap.org/api (new keys can take up to an hour to activate).
3. Rename `.env.example` to `.env` and paste your key after `API_KEY=`.
4. Install packages and start the server:

```
npm install
npm start
```

5. Open http://localhost:3000 and search for a city.

## Structure

```
weather-app/
├── public/
│   ├── index.html   page layout
│   ├── style.css    styling
│   └── script.js    frontend logic (calls /api/weather)
├── .env.example     API key template
├── package.json     dependencies
└── server.js        Express server + API route
```
