const { SlashCommandBuilder } = require("discord.js");
const { readFileSync } = require("fs");
const { writeFileSync } = require("fs");
const path = "./counter.json";

const jsonString = readFileSync(path);
console.log(JSON.parse(jsonString.toString()));

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
        let name = interaction.options.getString('input');
        const new_name = {"counterName": name};
        writeFileSync(path, JSON.stringify(new_name, null, 2), "utf8");
        await interaction.reply(`Counter name is now ${name}`);
    },
};