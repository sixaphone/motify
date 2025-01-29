import axios from "axios";

export const getMotivationalQuote = async () => {
  try {
    const { data } = await axios.get("https://zenquotes.io/api/random");

    const [quote] = data;

    return [
      null,
      {
        text: quote.q,
        author: quote.a,
      },
    ];
  } catch (error) {
    return [error, null];
  }
};
