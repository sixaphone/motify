import express from "express";
import { getWeatherForToday } from "./lib/weather.mjs";
import { Client } from "@gradio/client";
import {
  HF_TOKEN,
  RECIPIENTS,
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID,
} from "./constant.mjs";
import { getMotivationalVideo } from "./lib/youtube.mjs";
import { getMotivationalQuote } from "./lib/quote.mjs";
import { getMotivationalImage } from "./lib/unsplash.mjs";
import { WhatsAppBot } from "./lib/whatsapp.mjs";

const main = async () => {
  const [weatherError, weather] = await getWeatherForToday("Mostar");

  if (weatherError) {
    return {
      error: weatherError,
    };
  }

  const [videoError, video] = await getMotivationalVideo();

  if (videoError) {
    return {
      error: videoError,
    };
  }

  const [quoteError, quote] = await getMotivationalQuote();

  if (quoteError) {
    return {
      error: quoteError,
    };
  }

  const [imageError, image] = await getMotivationalImage();

  if (imageError) {
    return {
      error: imageError,
    };
  }

  const message = `
    You are a motivational speaker and want to help me start the day on a positive note.
    Start your paragraph with 'Hello X' where X is a motivational nickname. You can use any you like, use nicknames like champ, sunshine, superstar as inspiration.

    Here is a JSON of todays weather in my city ${JSON.stringify(weather)}.
    Here is a motivational youtube video name ${video.name} and link ${
    video.link
  }. You must include the video name and link provided in the response.
    Here is a motivational quote ${quote.text} and author ${
    quote.author
  }. You must include the quote and author provided in the response.

    Read me the weather in a funny and playful way, afterwards encourage me with watching the video, also include the quote and author provided.
    Separate greetings, weather, video and quote with a new line.
  `;
  const client = await Client.connect("sixaphone/motify", {
    hf_token: HF_TOKEN,
  });
  const result = await client
    .predict("/chat", {
      message,
      system_message:
        "You are a motivational speaker, who is friendly, funny and helpful. You want to provide motivation to the user.",
      temperature: 0.9,
      top_p: 0.4,
    })
    .catch((error) => {
      console.error(error);
      return { error: "Error, Please try again" };
    });

  if (result.error) {
    return {
      error: result.error,
    };
  }

  let text = result.data[0];
  text += `\n\nHere is a motivational image for you: ${image}`;
  const bot = new WhatsAppBot(WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID);

  await Promise.all(
    RECIPIENTS.map(async (rec) => {
      const res = await bot.sendMessage(rec.phone, text);
      return res;
    })
  ).catch((err) => {
    console.error(err);
  });

  return { text };
};

// const app = express();

// app.get("/", async (_req, res) => {
//   const response = await main();
//   return res.json(response);
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

main()
  .then((res) => {
    console.log(res);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
