import { getMSArticles } from "./pages/microsoft.js";
import { getMetaArticles } from "./pages/meta-eng.js";
import { getLinkedArticles } from "./pages/linkedin.js";
import { getNetflixArticles } from "./pages/netflix.js";
import { getGoogleArticles } from "./pages/google.js";
import { getSpotifyArticles } from "./pages/spotify.js";
import { client } from "./index.js";
import { EmbedBuilder } from "discord.js";

const fetchArticles = (getFunction) => (channel) => async (color) => {
  const customEmbeds = [];
  const val = await getFunction();
  val.articlesData.forEach((em) => {
    customEmbeds.push(
      new EmbedBuilder()
        .setTitle(`New updates from ${val.title} blog!`)
        .setDescription(`${em.desc}`)
        .setColor(color)
        .setImage(`${em.imageUrl}`)
        .setURL(`${em.url}`)
    );
  });
  if (customEmbeds.length > 0) {
    channel.send({
      embeds: customEmbeds,
    });
  }
};

export const checkTime = async () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  if (currentHour === 14 && currentMinute == 0) {
    const channel = client.channels.cache.get(
      process.env.CHANNEL_ID.toString()
    );
    if (channel) {
      await fetchArticles(getLinkedArticles)(channel)("DarkBlue");
      await fetchArticles(getMSArticles)(channel)("Red");
      await fetchArticles(getMetaArticles)(channel)("Blue");
      await fetchArticles(getGoogleArticles)(channel)("Green");
      await fetchArticles(getSpotifyArticles)(channel)("DarkGreen");
    } else {
      console.log("Channel not found!");
    }
  }
};
