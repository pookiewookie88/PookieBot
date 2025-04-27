module.exports =
{
    name: "extcumcountdown",
    description: "Counts down from 5 to 1 (For Apps)",
    async execute(interaction)
    {
        try {
            
            await interaction.deferReply(); 

            const tagline = [
                "So close now.",
                "That's it, beautiful.",
                "Hold on, sweetie.",
                "Closer now.",
                "Feel it build, darling.",
                "Almost there, love.",
            ];

            for (let i = 5; i > 0; i--)
            {
                try
                {
                    await interaction.followUp(`**${i}** - ${tagline[i - 1]}`);
                }
                catch (error)
                {
                    console.error("Error sending followUp:", error);
                    return;
                }
                await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-sec delay
            }

            await interaction.followUp("**Cum** - That's it, sweetheart.");
        } catch (error) {
            console.error("An error occurred in the extcumcountdown command:", error);
            await interaction.followUp({
                content: "An error occurred while executing the countdown. Please try again later.",
                ephemeral: true,
            });
        }
    },
};