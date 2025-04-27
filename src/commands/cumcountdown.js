module.exports = {
  name: "cumcountdown",
  description: "Counts down from 10 to 1",
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const tagline = [
        "Let go, my love.",
        "Just a breath away.",
        "You're perfect, baby.",
        "Stay with me.",
        "So close now.",
        "That's it, beautiful.",
        "Hold on, sweetie.",
        "Closer now.",
        "Feel it build, darling.",
        "Almost there, love.",
        "Drip for me, baby.",
        "Don't stop now.",
        "Right there… yes.",
        "You're doing so good.",
        "Shiver for me.",
        "I want every drop.",
        "Let it take you.",
        "That pressure… feel it?",
        "You're mine right now.",
        "I can hear your breath.",
        "No turning back.",
        "Mmm, it's so close.",
        "Edge it just a bit longer.",
        "Keep stroking, baby.",
        "Ride that wave.",
        "Lose control for me.",
        "Give it to me, all of it.",
        "Let it ache a little.",
        "Let that heat rise.",
        "Melt into it, sweet thing.",
      ];
      for (let i = 10; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * tagline.length);
        const randomTagline = tagline.splice(randomIndex, 1)[0];
        await interaction.channel.send(`**${i}** - ${randomTagline}`);
        const randomDelay = Math.floor(Math.random() * 5000) + 1000;
        await new Promise((resolve) => setTimeout(resolve, randomDelay));
      }
      await interaction.channel.send("**Cum** - That's it, sweetheart.");
      await interaction.followUp("Countdown complete!");
    } catch (error) {
      console.error("An error occurred in the cumcountdown command:", error);
      await interaction.followUp({
        content: "An error occurred while executing the countdown. Please try again later.",
        ephemeral: true,
      });
    }
  },
};