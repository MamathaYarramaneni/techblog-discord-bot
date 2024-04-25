import { Client, EmbedBuilder, IntentsBitField } from "discord.js";
import dotenv from "dotenv";
import { checkTime } from "./src/time-check.js";
import { getLinkedArticles } from "./src/pages/linkedin.js";
import { getMetaArticles } from "./src/pages/meta-eng.js";

dotenv.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(process.env.DISCORD_TOKEN.toString());

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(checkTime, 60000);
});

client.on("messageCreate", async (msg) => {
  if (msg.content === "hi") {
    const customEmbeds = [];
    const embed = await getMetaArticles().then((val) => {
      val.articlesData.forEach((em) => {
        customEmbeds.push(
          new EmbedBuilder()
            .setTitle(`New updates from ${val.title} blog!`)
            .setDescription(`${em.desc}`)
            .setColor("DarkGreen")
            .setImage(`${em.imageUrl}`)
            .setURL(`${em.url}`)
        );
      });
    });

    if (customEmbeds.length > 0) {
      msg.reply({
        embeds: customEmbeds,
      });
    }
  }
});
export default client;
