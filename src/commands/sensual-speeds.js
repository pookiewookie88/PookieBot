module.exports = {
  name: "sensual-speeds",
  description: "Stays at a sensual speed",
  options: [
    {
      name: "time",
      type: "INTEGER",
      description: "Duration in MINUTES",
      required: true,
    },
  ],
  async execute(interaction) {
    try {
      const messages = {
        1: [
          `Slow: Mmm, slow and deep… just like that.`,
          `Slow: Take it slow, baby. Let me savor you.`,
          `Slow: Don't rush… I want to taste every second.`,
          `Slow: Barely moving, but fully connected. Breathe with me.`,
          `Slow: I’m going to draw this out until you're begging.`,
          `Slow: We have all night, baby. No need to hurry.`,
          `Slow: You feel every inch, don’t you?`,
          `Slow: Inch by inch… I want every part of you to feel this.`,
          `Slow: Let it ache a little, sweet thing. I’m not done yet.`,
          `Slow: Mmm, just like that. Stay with me, slow and wet.`,
        ],
        3: [
          `Normal: Mmm, perfect rhythm. You're doing so good for me.`,
          `Normal: That steady grind? It’s making me lose my mind.`,
          `Normal: You're in control now, and I love every second.`,
          `Normal: Rock with me, sweet thing. Just like that.`,
          `Normal: Don’t stop. That motion’s making my body sing.`,
          `Normal: We’re in sync, and it’s delicious.`,
          `Normal: Yes, baby. Let that rhythm speak for you.`,
          `Normal: Every stroke like music between us.`,
          `Normal: Just how I like it… smooth, deep, and so damn good.`,
          `Normal: Keep riding me like that. I'm loving every second.`,
        ],
        5: [
          `Fast: Harder. Faster. More. Don’t stop now.`,
          `Fast: Fuck me like you mean it. Make me feel everything.`,
          `Fast: You're such a filthy little thing when you move like this.`,
          `Fast: I can hear the need in your breath. So fucking hot.`,
          `Fast: Pound into me like you can't get enough.`,
          `Fast: You’re making such a mess. Just how I like it.`,
          `Fast: Yes yes yes! That needy pace is everything.`,
          `Fast: You’re wild tonight, and I’m all yours.`,
          `Fast: So fucking greedy for it, aren’t you?`,
          `Fast: I’m dripping. Don’t you dare slow down.`,
        ],
        7: [
          `Edge: Hold it… don’t you cum yet.`,
          `Edge: You're so close, aren’t you, baby? But not yet.`,
          `Edge: Stay on the edge for me. I want you trembling.`,
          `Edge: You're mine. That climax doesn’t belong to you yet.`,
          `Edge: Just a breath away, and I’m keeping you right here.`,
          `Edge: I know it’s building… but you wait for my word.`,
          `Edge: You want it so bad. I can feel it in your strokes.`,
          `Edge: Beg for it. Show me how much you want to let go.`,
          `Edge: Don’t even think about finishing. You hold it.`,
          `Edge: That sweet desperation is what I crave from you.`,
        ],
      };

      const allSpeeds = [1, 3, 5, 7];
      const noEdgeStart = [1, 3, 5];
      const startTime = Date.now();
      const duration = interaction.options.getInteger("time") * 60000;
      let previousNumber = null;
      let firstMessageSent = false;

      await interaction.deferReply();

      const sendRandomMessage = async () => {
        while (Date.now() - startTime < duration) {
          let number;

          // First message must NOT be edge (7)
          if (!firstMessageSent) {
            do {
              number = noEdgeStart[Math.floor(Math.random() * noEdgeStart.length)];
            } while (number === previousNumber);
            firstMessageSent = true;
          } else {
            do {
              number = allSpeeds[Math.floor(Math.random() * allSpeeds.length)];
            } while (number === previousNumber);
          }

          previousNumber = number;

          const lines = messages[number];
          const line = lines[Math.floor(Math.random() * lines.length)];
          await interaction.followUp(line);

          const delay = Math.floor(Math.random() * (50000 - 20000 + 1)) + 20000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        await interaction.followUp(`💦 Time to cum… you’ve been such a good one.`);
      };

      sendRandomMessage();
    } catch (error) {
      console.error("An error occurred:", error);
      await interaction.reply("An unexpected error occurred. Please try again later.");
    }
  },
};
