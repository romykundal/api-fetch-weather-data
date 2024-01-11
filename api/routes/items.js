import express from "express";
import axios  from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const router = express.Router();

// Set up a route to fetch weather information as JSON
router.route('/weather').get( async (req, res, next) => {
  try {
    // Fetch data from OpenWeatherMap API
    const apiKey = OPENWEATHERMAP_API_KEY;
    const lat = req.query.lat || '-33.868820'; // Default latitude assigned if lat key is passing in query, it will be dynamic
    const long = req.query.long || '151.209290'; // Default longitude assigned if lat key is passing in query, it will be dynamic
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=`+lat+`&lon=`+long+`&appid=`+apiKey;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    // Return relevant information as JSON
    const jsonResponse = {  
      "code":200,
      "status":"success",
      "data":weatherData
   };

    res.json(jsonResponse);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;