/****************************************************************************


    ██████╗░██╗░██████╗██████╗░██╗░░░██╗███╗░░░███╗██████╗░███████╗██████╗░
    ██╔══██╗██║██╔════╝██╔══██╗██║░░░██║████╗░████║██╔══██╗██╔════╝██╔══██╗
    ██║░░██║██║╚█████╗░██████╦╝██║░░░██║██╔████╔██║██████╔╝█████╗░░██████╔╝
    ██║░░██║██║░╚═══██╗██╔══██╗██║░░░██║██║╚██╔╝██║██╔═══╝░██╔══╝░░██╔══██╗
    ██████╔╝██║██████╔╝██████╦╝╚██████╔╝██║░╚═╝░██║██║░░░░░███████╗██║░░██║
    ╚═════╝░╚═╝╚═════╝░╚═════╝░░╚═════╝░╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝╚═╝░░╚═╝

                              v1.0 by @lemonflux

                        This code is licensed under the
                       GNU Affero General Public License
                 https://www.gnu.org/licenses/agpl-3.0.en.html


****************************************************************************/

const { Client } = require('discord.js-selfbot-v13')
const client = new Client({checkUpdate: false,});
const yaml_config = require('node-yaml-config');
const clc = require('cli-color');
const center = require('center-align');
const fs = require("fs");
if (!(fs.existsSync("config.yml"))) {fs.open('config.yml', `default:
  token: "YOUR_TOKEN_HERE"
  bumpMessages: ["YOUR_BUMP_MESSAGES_TO_ACCOMPANY_THE_BUMP_COMMAND_HERE"]
  bumpChannels: ["YOUR_CHANNEL_IDS_HERE"]
  bumpBot: "302050872383242240" # disboard's bot ID by default
  bumpCommand: "bump"
  debug: false`, function (err, file) { if (err) throw err; });
console.log("Created config.yml, please add your token and restart the bot."); process.exit();}
var config = yaml_config.load('config.yml');
if (config.token === "YOUR_TOKEN_HERE") { console.log("Please add your token to config.yml"); process.exit(); }
if (config.bumpMessages.length < 1) { console.log("Please add at least one bump message to config.yml"); process.exit(); }
if (config.bumpChannels.length < 1) { console.log("Please add at least one bump channel to config.yml"); process.exit(); }
if (config.bumpChannels[0] === "YOUR_CHANNEL_IDS_HERE") { console.log("Please add your bump channel IDs to config.yml"); process.exit(); }
if (config.bumpMessages[0] === "YOUR_BUMP_MESSAGES_TO_ACCOMPANY_THE_BUMP_COMMAND_HERE") { console.log("Please add your bump messages to config.yml. e.g: bumping!"); process.exit(); }
const debug = config.debug;
const channelsz = config.bumpChannels;
const botID = config.bumpBot;
const cmd = config.bumpCommand;
const bMsgs = config.bumpMessages;
function printc(text, xTcolor=15, handleColor=true, handlePadding=false, trueText="") {
    if (handleColor) {
        if (handlePadding) {
            console.log(((clc.xterm(xTcolor))(text)).padStart(Math.floor((process.stdout.columns - text.length) / 2) + text.length, ' ').padEnd(process.stdout.columns, ' '));
        } else {
            console.log(center(((clc.xterm(xTcolor))(text)), process.stdout.columns));
        }
    } else {
        if (handlePadding) {
            console.log((text).padStart(Math.floor((process.stdout.columns - trueText.length) / 2) + trueText.length, ' ').padEnd(process.stdout.columns, ' '));
        } else {
            console.log(center((text), process.stdout.columns));
        }
    }
}
function init() {
    process.stdout.write('\x1Bc'); // bypass "octal sequence" error
    console.log("\n\n\n");
    printc(`██████╗░██╗░██████╗██████╗░██╗░░░██╗███╗░░░███╗██████╗░███████╗██████╗░`, 196); // 200
    printc(`██╔══██╗██║██╔════╝██╔══██╗██║░░░██║████╗░████║██╔══██╗██╔════╝██╔══██╗`, 196); // 205
    printc(`██║░░██║██║╚█████╗░██████╦╝██║░░░██║██╔████╔██║██████╔╝█████╗░░██████╔╝`, 196); // 211
    printc(`██║░░██║██║░╚═══██╗██╔══██╗██║░░░██║██║╚██╔╝██║██╔═══╝░██╔══╝░░██╔══██╗`, 196); // 216
    printc(`██████╔╝██║██████╔╝██████╦╝╚██████╔╝██║░╚═╝░██║██║░░░░░███████╗██║░░██║`, 196); // 222
    printc(`╚═════╝░╚═╝╚═════╝░╚═════╝░░╚═════╝░╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝╚═╝░░╚═╝`, 196); // 228
    console.log("\n");
    printc('v1.0 by @lemonflux', 164); // ((clc.white)("v1.0 by ") + (clc.magentaBright.bold.underline)(`@lemonflux`)), 0, false, "v1.0 by @lemonflux"
    console.log("\n" + ((clc.blackBright)("_")).repeat(process.stdout.columns - 7));
    console.log("\n");
    client.login(config.token);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}
client.on('ready', async () => {
    printc(`[!] ${client.user.tag} is now online as a bump-bot!`, 63);
    if (debug) printc(`Logged into account: ${client.user.tag} | ${client.user.id}`, 41)
    async function executeSlash(cX, bID, cd, c1) {
        tM = getRandomInt(1300, 5233);
        if (debug) printc("Waiting " + tM.toString() + "ms to send slash to <" + c1 + ">", 41)
        setTimeout(async function () {
            await cX.sendSlash(bID, cd);
            printc('Bumped <' + c1 + ">", 176);
        }, tM);
    }
    async function bump(c) {
        time = getRandomInt(2, 120);
        if (debug) printc("Waiting " + time.toString() + "s to bump <" + c + ">", 41)
        setTimeout(async function () {
            try {
                c2 = await client.channels.fetch(c);
                if (debug) printc("Bump will be directed to <" + c2 + ">", 41)
                await c2.send((bMsgs[getRandomInt(0, (bMsgs.length - 1))]).toString());
                if (debug) printc("Bump message sent in <" + c2 + ">, now executing slash", 41)
                executeSlash(c2, botID, cmd.toString(), c);
            } catch (e) {
                console.error('Error while bumping <' + c + ">");
            }
        }, time * 1000);
    }
    async function runB(rCA, i) {
        tA = (getRandomInt(1111, 9999) * (i + 1));
        if (debug) printc("Preliminary waiting " + tA + "ms for <" + channelsz[i] + ">", 41)
        setTimeout(async function () {
            bump(rCA);
        }, tA);
    }
    async function bAll() {
        for (var i = channelsz.length - 1; i >= 0; i--) {
            if (debug) printc("Preparing to bump in <" + channelsz[i] + ">", 41)
            runB(channelsz[i], i);
        }
    }

    function lUp() {
        if (debug) printc("Cycle completed, waiting for next cycle", 41)
        var rtA = Math.round(Math.random() * (9000000 - 7200000 + 1)) + 7200000
        setTimeout(function () {
            bAll();
            lUp()
        }, rtA)
    }

    bAll();
    lUp()

});

init();
