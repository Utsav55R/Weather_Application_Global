// 1. Grab the elements we need from the page
var form = document.getElementById('search-form');
var cityInput = document.getElementById('city-input');
var message = document.getElementById('message');
var card = document.getElementById('weather-card');

// 2. Run this when the user submits the form
form.addEventListener('submit', async function (event) {
  event.preventDefault(); // stop the page from reloading

  var city = cityInput.value.trim();
  if (city === '') {
    showMessage('Please enter a city name.', true);
    return;
  }

  showMessage('Loading...', false);
  card.classList.add('hidden');

  try {
    // 3. Call OUR backend (not OpenWeatherMap directly)
    var response = await fetch('/api/weather?city=' + encodeURIComponent(city));
    var data = await response.json();

    if (!response.ok) {
      showMessage(data.error, true);
      return;
    }

    // 4. Show the result
    showWeather(data);
    showMessage('', false);
  } catch (err) {
    showMessage('Could not reach the server.', true);
  }
});

// Fill the card with weather data
function showWeather(data) {
  document.getElementById('city-name').textContent = data.city + ', ' + data.country;
  document.getElementById('weather-icon').src =
    'https://openweathermap.org/img/wn/' + data.icon + '@2x.png';
  document.getElementById('temperature').textContent = data.temperature + '°C';
  document.getElementById('description').textContent = data.description;
  document.getElementById('feels-like').textContent = data.feelsLike + '°C';
  document.getElementById('humidity').textContent = data.humidity + '%';
  document.getElementById('wind').textContent = data.windSpeed + ' m/s';
  card.classList.remove('hidden');
}

// Show a status or error message
function showMessage(text, isError) {
  message.textContent = text;
  if (isError) {
    message.classList.add('error');
  } else {
    message.classList.remove('error');
  }
}
