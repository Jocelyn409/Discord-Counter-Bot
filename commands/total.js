const { SlashCommandBuilder } = require("discord.js");
const fileSync = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName('total')
        .setDescription('Show the total counter amount'),

    async execute(interaction) {
        let jsonData = JSON.parse(fileSync.readFileSync("./counter.json", 'utf-8'));

        if(jsonData.counterName !== null) {
            await interaction.reply(`Counter total: ${jsonData.runningTotal}`);
            if(JSON.stringify(jsonData.userScores).length !== undefined) {
                await interaction.followUp(`User totals: ${JSON.stringify(jsonData.userScores, null, 4)}`);
            }
            else {
                await interaction.followUp(`No user totals available`);
            }
        }
        else {
            await interaction.reply("You need to name the counter before viewing the total");
        }
    },

};