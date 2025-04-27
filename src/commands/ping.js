module.exports = {
  name: "ping",
  description: "Tells current bot latency",
  execute(interaction) {
    try {
      interaction.reply(
        `🍾Latency is ${
          Date.now() - interaction.createdTimestamp
        }ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms`
      );
    } catch (error) {
      console.error("Error executing ping command:", error);
      interaction.reply("⚠️ An error occurred while executing the command.");
    }
  },
};
