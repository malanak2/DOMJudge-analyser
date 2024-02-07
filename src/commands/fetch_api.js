const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
const puppeteer = require('puppeteer')

const api_link = "https://domjudge.zapotocnylubos.com";
require('dotenv').config()
module.exports = {
    register_command: new SlashCommandBuilder()
        .setName('fetch_api')
        .setDescription('Fetches data from API!'),
    async execute(client, interaction) {
        const reply = await interaction.reply("‎");
        const testEmbed = new Discord.EmbedBuilder().setColor(0x0099FF).setTitle("Scraping in progress...");
        reply.edit({ embeds: [testEmbed], components: [] });
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });

        const page = await browser.newPage();
        await page.setViewport({width: 1200, height: 720})
        await page.goto(api_link + "/login", {
            waitUntil: "networkidle0",
        });

        // await page.waitForNavigation();

        await page.type('#username', "YOUR USERNAME HERE");
        await page.type('#inputPassword', "YOUR_PASSWORD_HERE");

        await page.click('button[type="submit"]')

        await page.goto(api_link + "/team/scoreboard", {
            waitUntil: "networkidle0",
        });

        let name = await page.evaluate(()=>{
            let rawname =document.querySelector(".card-header").innerHTML.replace('<span style="font-weight: bold;">', "");
            return rawname.slice(0, rawname.length - 215 - 7 - 2);
        })

        let data = await page.evaluate(() => {
            return Array.from(
                document.querySelectorAll('table[class="scoreboard center "] > tbody > tr'),
                row => Array.from(row.querySelectorAll('th, td'), cell => cell.innerText)
            )
            /*const rawname = document.querySelector(".card-header").innerHTML.replace('<span style="font-weight: bold;">', "");
            /*const contestantsarr = (() => {

            });
            const table = document.querySelector(".scoreboard")
            const tbody = table.childNodes[4];
            const content = tbody.childNodes;
            let arr = "";
            for (let i = 0; i < content.length - 1; i++) {
                arr += `|Rank: ${content[i].childNodes[0].nodeName}, Name: ${content[i].childNodes[2].nodeName}, Completed úlohy: , Skóre:`;
                //console.log(`Rank: ${content[i].childNodes[0].textContent}, Name: ${content[i].childNodes[2].attr("title")}, Completed úlohy: , Skóre:`);
            }
            return arr + "return val";//rawname.slice(0, rawname.length - 215 - 7 - 2);
            //return rawname.innerHTML;*/
        })
        const repEmbed = new Discord.EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(name)
            //.addFields([name="Name", value=data])
        ;
        for(let i = 0; i < data.length-1; i++)
        {
            repEmbed.addFields({name: data[i][2], value: `Rank: ${data[i][0]}, Finished Trials: ${data[i][3]}, Total Score: ${data[i][4]}`});
        }


        console.log("");
        await browser.close();

        return reply.edit({embeds:[repEmbed],ephemeral :true});
    }
}