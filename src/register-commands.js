require("dotenv").config();
const
{
    REST,
    Routes,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} = require("discord.js");

//commands !!
//This file must be executed once, to register the commands to the discord's server and portal, alongwith the servers the bot is in, whenever a change is made here, the file must be executed.
const commands = [
    {
        name: "info",
        description: "Gives info about the bot",
    },
    {
        name: "ping",
        description: "Gives the Bot latency",
    },
    {
        name: "cumcountdown",
        description: "Counts down from 10 to 1",
    },
    {
        name: "extcumcountdown",
        description: "Counts down from 10 to 1 (For Apps)",
    },
    {
        name: "tease",
        description: "Teases the user",
    },
    {
        name: "sensual-speeds",
        description: "Stays at a sensual speed",
        options: [
            {
                name: "time",
                type: ApplicationCommandOptionType.Integer,
                description: "Duration in MINUTES ",
                required: true,
            },
        ],
    },
    {
        name: "say",
        description: "Says what you want to",
        options: [
            {
                name: "message",
                type: ApplicationCommandOptionType.String,
                description: "Enter message to say",
                required: true,
            },
        ],
    }

];
// commands lie above here careful

const rest = new REST(
    {
        version: "10"
    }
    ).setToken(process.env.TOKEN);

(async() =>
{
    try
    {
        console.log("Registering slash commands...");

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID),
        {
            body: commands,
        }
        );

        console.log("Slash commands were registered successfully!");
    }
    catch (error)
    {
        console.log(`There was an error: ${error}`);
    }
}
)();

//to be addded commands -  search(using google search), flip a coin, minigames  like this
