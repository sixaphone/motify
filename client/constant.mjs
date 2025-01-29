export const RECIPIENTS = process.env.RECIPIENTS.split(",").map((recipient) => {
  const [name, phone] = recipient.split("|");
  return { name, phone };
});

export const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const HF_TOKEN = process.env.HF_TOKEN;

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

export const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

export const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
