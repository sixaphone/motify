import axios from "axios";
import { UNSPLASH_API_KEY } from "../constant.mjs";

export const getMotivationalImage = async () => {
  try {
    const { data } = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        query: "motivation",
        orientation: "landscape",
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      },
    });

    return [null, data.urls.regular];
  } catch (error) {
    return [error, null];
  }
};
