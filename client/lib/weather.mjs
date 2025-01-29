import axios from "axios";
import { WEATHER_API_KEY } from "../constant.mjs";

export const getWeatherForToday = async (city) => {
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const response = await axios.get(APIUrl);
    return [null, response.data];
  } catch (error) {
    console.error(error);
    return [new Error("Error, Please try again"), null];
  }
};
