const { SlashCommandBuilder } = require("discord.js");
const fileSync = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName('name-counter')
        .setDescription('Names the counter')
        .addStringOption(option =>
            option
                .setName('input')
                .setDescription('Name')
                .setRequired(true)),

    async execute(interaction) {
        let jsonData = JSON.parse(fileSync.readFileSync("./counter.json", 'utf-8'));
        let new_name = interaction.options.getString('input');

        jsonData.counterName = new_name;
        fileSync.writeFileSync("./counter.json", JSON.stringify(jsonData));
        console.log("Counter name is now: " + new_name);

        // Relay information
        await interaction.reply(`Counter name is now the ${new_name} Counter`);
    },

};