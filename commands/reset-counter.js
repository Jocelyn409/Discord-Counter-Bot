const { SlashCommandBuilder } = require("discord.js");
const fileSync = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName('reset-counter')
        .setDescription('Resets the counter'),

    async execute(interaction) {
        let jsonData = JSON.parse(fileSync.readFileSync("./counter.json", 'utf-8'));

        if(jsonData.counterName !== null) {
            jsonData.runningTotal = 0;
            jsonData.userScores = {};
            fileSync.writeFileSync("./counter.json", JSON.stringify(jsonData, null, 4));
            console.log("Reset counter total");

            await interaction.reply(`${jsonData.counterName} has been reset`);
        }
        else {
            await interaction.reply("Can't reset counter as none exists");
        }
    },

};