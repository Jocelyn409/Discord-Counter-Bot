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

            if(jsonData["userScores"][user.tag] !== undefined) {
                jsonData["userScores"][user.tag] += 1;
            }
            else {
                jsonData["userScores"][user.tag] = 1;
            }
            fileSync.writeFileSync("./counter.json", JSON.stringify(jsonData, null, 4));

            // Relay information
            await interaction.reply(`${member} has added to the ${jsonData.counterName} Counter\nThe total is now ${jsonData.runningTotal}!`);
            await interaction.followUp({content: `Your individual total is now ${jsonData["userScores"][user.tag]}`, ephemeral: true})
        }
        else {
            await interaction.reply("You need to name the counter before incrementing it");
        }
    },

};