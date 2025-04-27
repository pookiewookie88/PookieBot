module.exports = {
    name: "tease",
    description: "Teases the user",
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
        let count = 10;
        while (count > 0) {
          const randomIndex = Math.floor(Math.random() * tagline.length);
          const randomTagline = tagline.splice(randomIndex, 1)[0];
          await interaction.channel.send("**"+count.toString() + "** - " + randomTagline);
          const randomDelay = Math.floor(Math.random() * 5000) + 1000;
          await new Promise(resolve => setTimeout(resolve, randomDelay));
  
          count--;
  
          if (count === 2) {
            const y = Math.floor(Math.random() * 5) + 1; 
            if (y > 3) {
              count = 10;
            }
          }
        }
        await interaction.channel.send("**Release** !! :heart:");
        await interaction.followUp("Countdown complete!");
      } catch (error) {
        console.error("An error occurred in the 'tease' command:", error);
        await interaction.followUp("Something went wrong while executing the command.");
      }
    },
  };