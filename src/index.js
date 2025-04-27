require("dotenv").config();
const { Client, IntentsBitField, Collection, ActivityType } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

client.commands = new Collection();

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args));
}


client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  client.user.setActivity({
    name: "coy… break my focus.",
    type: ActivityType.Playing,
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    interaction.reply({
      content: "There was an error executing that command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.TOKEN);