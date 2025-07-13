import axios from "axios";

export const getUnsplashImage = async (query: string) => {
  const apiKey = process.env.UNSPLASH_API_KEY;

  if (!apiKey) {
    throw new Error("UNSPLASH_API_KEY is not set in environment variables");
  }

  const url = `https://api.unsplash.com/search/photos?per_page=1&query=${encodeURIComponent(
    query
  )}&client_id=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    const result = data?.results?.[0]?.urls?.small_s3;

    if (!result) {
      throw new Error("No image found for the given query");
    }

    return result;
  } catch (error: any) {
    console.error("Unsplash API error:", error.response?.data || error.message);
    throw new Error("Failed to fetch image from Unsplash");
  }
};
