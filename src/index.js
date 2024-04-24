import { Client, EmbedBuilder, IntentsBitField } from "discord.js";
import dotenv from "dotenv";
import { getMSArticles } from "./pages/microsoft.js";
import { getMetaArticles } from "./pages/meta-eng.js";
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

client.on("messageCreate", async (msg) => {
  if (msg.content === "hi") {
    const customEmbeds = [];
    const embed = await getMetaArticles().then((val) => {
      val.articlesData.forEach((em) => {
        customEmbeds.push(
          new EmbedBuilder()
            .setTitle(`New updates from ${val.title} blog!`)
            .setDescription(`${em.desc}`)
            .setColor("Red")
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
