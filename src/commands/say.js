module.exports = {
  name: "say",
  description: "Says what you want to",
  async execute(interaction) {
    try {
      const message = interaction.options.getString('message');
      await interaction.reply(message);
    } catch (error) {
      console.error("Error in 'say' command:", error);
      await interaction.reply("An error occurred while processing your request.");
    }
  },
};