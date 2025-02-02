# Motify - Daily Motivational WhatsApp Bot

Motify is a Node.js application that generates daily motivational messages and sends them via WhatsApp. It curates a personalized motivational experience by including:
- The day's weather forecast
- A motivational YouTube video
- A motivational quote
- A motivational image from Unsplash

## Features
- Fetches the weather using OpenWeather API
- Retrieves motivational quotes from ZenQuotes API
- Searches for motivational YouTube videos using Google API
- Fetches random motivational images from Unsplash API
- Uses OpenAI-powered chatbot to generate personalized messages
- Sends messages via WhatsApp using the WhatsApp Business API

## Installation

### Prerequisites
- Node.js (v16 or higher)
- A WhatsApp Business API account
- API keys for:
  - OpenWeather
  - ZenQuotes
  - Google (YouTube Data API)
  - Unsplash
  - Hugging Face (Gradio chatbot)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/motify.git
   cd motify/client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `client/` directory and populate it with the required API keys:
   ```env
   WEATHER_API_KEY=your_openweather_api_key
   HF_TOKEN=your_huggingface_token
   GOOGLE_API_KEY=your_google_api_key
   UNSPLASH_API_KEY=your_unsplash_api_key
   WHATSAPP_ACCESS_TOKEN=your_whatsapp_api_token
   WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
   RECIPIENTS="John|+1234567890,Mary|+9876543210"
   ```

## Running the Application

### Development Mode
```sh
npm run dev
```

### Production Mode
```sh
npm start
```

## How It Works
1. The script retrieves the weather, a motivational quote, a YouTube video, and an image.
2. It generates a friendly and humorous motivational message using Hugging Face's chatbot.
3. The message is then sent via WhatsApp to all recipients listed in `.env`.

## API References
- **Weather API**: [OpenWeather](https://openweathermap.org/api)
- **Quotes API**: [ZenQuotes](https://zenquotes.io/)
- **YouTube API**: [Google Developers](https://developers.google.com/youtube/v3)
- **Unsplash API**: [Unsplash Developers](https://unsplash.com/developers)
- **WhatsApp Business API**: [Meta for Developers](https://developers.facebook.com/docs/whatsapp/)

## License
This project is licensed under the MIT License.


