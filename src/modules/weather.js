// src/modules/weather.js - Weather System

import { GameState } from './state.js';

const WEATHER_CYCLE = ['sunny', 'cloudy', 'sunny', 'sunset', 'night', 'rainy'];
const WEATHER_INTERVAL = 45000; // 45 seconds

/**
 * Start the weather cycle
 */
export function startWeatherCycle() {
  let weatherIndex = 0;
  
  function cycleWeather() {
    weatherIndex = (weatherIndex + 1) % WEATHER_CYCLE.length;
    setWeather(WEATHER_CYCLE[weatherIndex]);
  }
  
  // Change weather periodically
  GameState.weatherTimer = setInterval(cycleWeather, WEATHER_INTERVAL);
  setWeather('sunny'); // Start sunny
}

/**
 * Stop the weather cycle
 */
export function stopWeatherCycle() {
  if (GameState.weatherTimer) {
    clearInterval(GameState.weatherTimer);
    GameState.weatherTimer = null;
  }
}

/**
 * Set the current weather
 * @param {string} weather - Weather type: sunny, cloudy, rainy, sunset, night
 */
export function setWeather(weather) {
  GameState.currentWeather = weather;
  
  const sky = document.getElementById('garden-sky');
  const sun = document.getElementById('garden-sun');
  const weatherEffects = document.getElementById('weather-effects');
  
  if (!sky || !sun || !weatherEffects) return;
  
  // Remove all weather classes
  sky.classList.remove('sunny', 'cloudy', 'rainy', 'sunset', 'night');
  weatherEffects.classList.remove('rain', 'stars');
  
  // Apply new weather
  sky.classList.add(weather);
  
  // Sun visibility and effects
  switch (weather) {
    case 'night':
      sun.style.opacity = '0';
      weatherEffects.classList.add('stars');
      break;
    case 'rainy':
      sun.style.opacity = '0.3';
      weatherEffects.classList.add('rain');
      break;
    case 'cloudy':
      sun.style.opacity = '0.5';
      break;
    default:
      sun.style.opacity = '1';
  }
}

/**
 * Get current weather
 * @returns {string} - Current weather type
 */
export function getCurrentWeather() {
  return GameState.currentWeather;
}
