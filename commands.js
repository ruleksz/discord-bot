const { SlashCommandBuilder, REST, Routes } = require("discord.js");

const commands = [
    new SlashCommandBuilder()
        .setName("log")
        .setDescription("Add dev log")
        .addStringOption(option =>
            option.setName("text")
                .setDescription("log text")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("todo")
        .setDescription("Add todo")
        .addStringOption(option =>
            option.setName("text")
                .setDescription("todo text")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("note")
        .setDescription("Add note")
        .addStringOption(option =>
            option.setName("text")
                .setDescription("note text")
                .setRequired(true)
        )
].map(cmd => cmd.toJSON());

async function registerCommands(client) {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    await rest.put(
        Routes.applicationGuildCommands(
            client.user.id,
            process.env.GUILD_ID
        ),
        { body: commands }
    );
}

async function handleCommands(interaction) {
    const text = interaction.options.getString("text");

    if (interaction.commandName === "log") {
        const channel = await interaction.client.channels.fetch(
            process.env.LOG_CHANNEL
        );

        channel.send(`Developer Log:\n${'```', text, '```'}`);
        interaction.reply({ content: "Logged ✅", ephemeral: true });
    }

    if (interaction.commandName === "todo") {
        const channel = await interaction.client.channels.fetch(
            process.env.TODO_CHANNEL
        );

        channel.send(`📌 TODO:\n${'```', text, '```'}`);
        interaction.reply({ content: "Todo added ✅", ephemeral: true });
    }

    if (interaction.commandName === "note") {
        const channel = await interaction.client.channels.fetch(
            process.env.NOTE_CHANNEL
        );

        channel.send(`🧠 Note\n${text}`);
        interaction.reply({ content: "Note saved ✅", ephemeral: true });
    }
}

module.exports = {
    registerCommands,
    handleCommands
};