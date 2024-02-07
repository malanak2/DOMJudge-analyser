const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')

const api_link = "https://domjudge.zapotocnylubos.com";

module.exports = {
    register_command: new SlashCommandBuilder()
        .setName('fetch_api')
        .setDescription('Fetches data from API!'),
    async execute(client, interaction) {
        let response = await fetch(api_link + "/api/v4/?strict=false&onlyActive=true", {
            method: "GET",
            headers: {},
            /*body: JSON.stringify({
                ids: [],
                strict: false,
                onlyActive: true
            })*/
        });
        let data= response.json();
        if (response.status !== 200)return interaction.reply({content:"Failed to fetch data from API. HTTP Code: " + response.status,ephemeral :true});
        console.log(response.status);
        return interaction.reply({content:JSON.stringify(data),ephemeral :true});
    }
}