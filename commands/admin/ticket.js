const {
    ActionRowBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonStyle,
    Colors,
    PermissionsBitField
} = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'ticket',
    description: 'Destek sistemini gönderir.',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction, args) => {
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({
            cotent: `Bu komutu çalıştırmak için izniniz yok!`
        })

        interaction.channel.send({
            embeds: [{
                title: "Yeni bilet talebi oluştur",
                description: `Oluşturmak istediğiniz destek talebi kategorisini aşağıdan seçiniz.\n\n**Not:** Gereksiz yere destek talepleri oluşturmak uyarılar almanıza sebep olabilir.`,
                footer: {
                    text: "EdXProject Destek"
                },
                color: Colors.Blurple,
                image: {
                    url: config.ticketbanner
                }
            }],            
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId('staff').setLabel('Satış Öncesi Destek').setEmoji('756174148396384286').setStyle(ButtonStyle.Success),
                    new ButtonBuilder().setCustomId('answer').setLabel('Teknik Destek').setEmoji('755711090985533512').setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId('other').setLabel('Diğer').setEmoji('957524609559822336').setStyle(ButtonStyle.Danger)
                )
            ]
        })
    }
}