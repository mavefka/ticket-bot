const {
    Routes
} = require('discord-api-types/v9');
const {
    REST
} = require('@discordjs/rest')
const {
    readdirSync
} = require('fs');
const colors = require('colors');

module.exports = (client) => {
    // # slashCommands
    const arrayOfSlashCommands = [];

    const loadSlashCommands = (dir = "./commands/") => {
        readdirSync(dir).forEach(dirs => {
            const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

            for (const files of commands) {
                const getFileName = require(`../${dir}/${dirs}/${files}`);
                client.slashCommands.set(getFileName.name, getFileName);
                console.log(`[edxproject]`.bold.red + ` komut aktive ediliyor :`.bold.white + ` ${getFileName.name}`.bold.red);
                arrayOfSlashCommands.push(getFileName);
            }
        })

        setTimeout(async () => {
            console.log(`API >`.bold.white + ` discord api baglanildi.`.bold.green)
            await client.application.commands.set(arrayOfSlashCommands);
        }, 5000)
    }
    loadSlashCommands();

    console.log(`•----------•`.bold.black)

    // # events
    const loadEvents = (dir = "./events/") => {
        readdirSync(dir).forEach(dirs => {
            const events = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js"));

            for (const files of events) {
                const getFileName = require(`../${dir}/${dirs}/${files}`)
                client.on(getFileName.name, (...args) => getFileName.execute(...args, client))
                console.log(`[edxproject]`.bold.red + `api calistiriliyor. :`.bold.white + ` ${getFileName.name}`.bold.red);
                if (!events) return console.log(`[edxproject]`.bold.red + `bir sey yok : `.bold.yellow + `${files}`.bold.red)
            }
        })
    }
    loadEvents();
    console.log(`•----------•`.bold.black)
}