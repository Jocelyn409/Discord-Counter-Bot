const { SlashCommandBuilder } = require("discord.js");
const { readFileSync } = require("fs");
const path = "./counter.json";

const jsonString = readFileSync(path);
console.log(JSON.parse(jsonString.toString()));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duty')
        .setDescription('Increment the counter'),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);

        await interaction.reply(`${member} has added to the counter!`);
        await interaction.followUp('There is now ');
    },
};