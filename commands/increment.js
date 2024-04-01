const { SlashCommandBuilder } = require("discord.js");
const fileSync = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName('increment')
        .setDescription('Increment the counter'),

    async execute(interaction) {
        let jsonData = JSON.parse(fileSync.readFileSync("./counter.json", 'utf-8'));

        if(jsonData.counterName !== null) {
            // Update total
            jsonData.runningTotal = jsonData.runningTotal + 1;
            console.log("Counter total is now: " + jsonData.runningTotal);

            // Update individual score
            const user = interaction.options.getUser('user') || interaction.user;
            const member = await interaction.guild.members.fetch(user.id);

            jsonData.userScores.member = 1;
            fileSync.writeFileSync("./counter.json", JSON.stringify(jsonData));

            // Relay information
            await interaction.reply(`${member} has added to the ${jsonData.counterName} Counter`);
            await interaction.followUp(`The total is now ${jsonData.runningTotal}!`);
        }
        else {
            await interaction.reply("You need to name the counter before incrementing it");
        }
    },

};