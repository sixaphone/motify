import { google } from "googleapis";
import { GOOGLE_API_KEY } from "../constant.mjs";

export const getMotivationalVideo = async () => {
  const client = google.youtube("v3");

  try {
    const res = await client.search.list({
      key: GOOGLE_API_KEY,
      q: `motivational video`,
      order: "",
      type: "video",
      maxResults: 50,
      videoDuration: "medium",
      order: "viewCount",
      part: "id,snippet",
    });

    const randomVideoIdx = Math.floor(Math.random() * res.data.items.length);
    const randomVideo = res.data.items[randomVideoIdx];

    return [
      null,
      {
        name: randomVideo.snippet.title,
        link: `https://www.youtube.com/watch?v=${randomVideo.id.videoId}`,
      },
    ];
  } catch (error) {
    return [error, null];
  }
};
