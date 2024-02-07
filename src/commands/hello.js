const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')

module.exports = {
    register_command: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('replies with World!'),
    async execute(client, interaction) {
        return interaction.reply({content:`World!`,ephemeral :true})
    }
}