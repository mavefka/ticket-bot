const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    Colors,
    PermissionFlagsBits
} = require('discord.js');
const transcript = require('discord-html-transcripts');
const config = require('../../config.json');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        if (!interaction.isButton()) return;

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('claim').setLabel('Sahiplen').setEmoji('📩').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('close').setLabel('Kapat').setEmoji('🗑').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('transcript').setLabel('Log oluştur').setEmoji('📁').setStyle(ButtonStyle.Primary)
            )


        let category = config.parent;
        let roleStaff = interaction.guild.roles.cache.get(config.roleStaffId);
        let LogChannel = config.logChannel;

        let AlreadyAChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id);
        if (AlreadyAChannel) return interaction.rely({
            content: ":x: | Zaten hali hazırda bir destek talebiniz bulunuyor.",
            ephemeral: true
        });

        if (interaction.customId === "close") {
            let channel = interaction.channel;
            channel.delete()
        } else if (interaction.customId === "claim") {
            interaction.reply({
                embeds: [{
                    description: `Destek talebinizle artık ${interaction.user} yetkilimiz ilgileniyor, beklediğiniz için teşekkür ederiz.`,
                    footer: {
                        text: "EdXProject Destek Sistemi"
                    },
                    color: Colors.Blurple
                }]
            })
        } else if (interaction.customId === "transcript") {
            interaction.reply({
                embeds: [{
                    description: `📁 başarıyla log oluşturuldu.`,
                    footer: {
                        text: "EdXProject Destek Sistemi"
                    },
                    color: Colors.Blurple
                }]
            })

            client.channels.cache.get(config.logChannel).send({
                embeds: [{
                    description: `📁 ${interaction.channel} logu`,
                    footer: {
                        text: "EdXProject Destek Sistemi"
                    },
                    color: Colors.Blurple
                }],
                files: [await transcript.createTranscript(interaction.channel)]
            })
        } else if (interaction.customId === "staff") {
            interaction.guild.channels.create({
                name: `ticket ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: config.parent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user}||`,
                    embeds: [{
                        title: "Satış Öncesi Destek",
                        description: `🎫 **Destek Bileti Ön Hatırlatmaları:**\nBir yetkilimizin size en uygun şekilde yardımcı olabilmesi için talep detaylarınızı belirtin. \n\n📕 **Çalışma saatlerimiz** \n**Pazartesi:** ${config.workingHours.Pazartesi} \n**Salı:** ${config.workingHours.Sali} \n**Çarşamba:** ${config.workingHours.Carsamba} \n**Perşembe:** ${config.workingHours.Persembe} \n**Cuma:** ${config.workingHours.Cuma} \n**Cumartesi:** ${config.workingHours.Cumartesi} \n**Pazar:** ${config.workingHours.Pazar} \n`,
                        footer: {
                            text: "EdXProject Destek",
                        },
                        color: Colors.Blurple
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Biletiniz başarıyla açıldı. <#${c.id}>`,
                    ephemeral: true
                })
            })

        } else if (interaction.customId === "answer") {
            interaction.guild.channels.create({
                name: `ticket ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: config.parent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user}||`,
                    embeds: [{
                        title: "Teknik Destek",
                        description: `🎫 **Destek Bileti Ön Hatırlatmaları:**\nBir yetkilimizin size en uygun şekilde yardımcı olabilmesi için talep detaylarınızı belirtin. \n\n📕 **Çalışma Saatleri** \n**Pazartesi:** ${config.workingHours.Pazartesi} \n**Salı:** ${config.workingHours.Sali} \n**Çarşamba:** ${config.workingHours.Carsamba} \n**Perşembe:** ${config.workingHours.Persembe} \n**Cuma:** ${config.workingHours.Cuma} \n**Cumartesi:** ${config.workingHours.Cumartesi} \n**Pazar:** ${config.workingHours.Pazar} \n`,
                        footer: {
                            text: "EdXProject Destek",
                        },
                        color: Colors.Blurple
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Biletiniz başarıyla açıldı. <#${c.id}>`,
                    ephemeral: true
                })
            })
        } else if (interaction.customId === "other") {
            interaction.guild.channels.create({
                name: `ticket ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: config.parent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user}||`,
                    embeds: [{
                        title: "Diğer",
                        description: `🎫 **Destek Bileti Ön Hatırlatmaları:**\nBir yetkilimizin size en uygun şekilde yardımcı olabilmesi için talep detaylarınızı belirtin. \n\n📕 **Çalışma Saatleri** \n**Pazartesi:** ${config.workingHours.Pazartesi} \n**Salı:** ${config.workingHours.Sali} \n**Çarşamba:** ${config.workingHours.Carsamba} \n**Perşembe:** ${config.workingHours.Persembe} \n**Cuma:** ${config.workingHours.Cuma} \n**Cumartesi:** ${config.workingHours.Cumartesi} \n**Pazar:** ${config.workingHours.Pazar} \n`,
                        footer: {
                            text: "EdX Project Destek",
                        },
                        color: Colors.Blurple
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Biletiniz başarıyla açıldı. <#${c.id}>`,
                    ephemeral: true
                })
            })
        }
    }
}
