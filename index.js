const { exec } = require("child_process");

exec("git pull --rebase", (err, stdout) => {
    console.log(stdout);
});

require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { registerCommands, handleCommands } = require("./commands");
require("./webhook");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);
    await registerCommands(client);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    handleCommands(interaction);
});

global.discordClient = client;

client.login(process.env.TOKEN);