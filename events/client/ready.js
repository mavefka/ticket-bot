const colors = require('colors');
const {
    ActivityType
} = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'ready',
    once: false,
    execute: async (client) => {

        console.log('[API] '.bold.green + `giriş yapıldı.`.bold.white)
        let statuses = [config.status]
        setInterval(function () {
            let status = statuses[Math.floor(Math.random() * statuses.length)];
            client.user.setPresence({
                activities: [{
                    name: status,
                    type: ActivityType.Watching
                }],
                status: "dnd"
            })
        }, 10000)

    }
}