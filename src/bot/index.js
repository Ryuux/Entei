const { Client, GatewayIntentBits, Partials } = require('discord.js')
const User = require('../models/User')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution
  ],
  partials: [
    Partials.USER,
    Partials.CHANNEL,
    Partials.GUILD_MEMBER,
    Partials.MESSAGE,
    Partials.REACTION
  ]
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

const prefix = '!'
client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) && message.author.bot) return
  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === 'list') {
    try {
      const users = await User.find({})
      const rows = users.map(user => `| ${user.userId} | ${user.userName} | ${user.accessToken} | ${user.refreshToken} |`).join('\n')
      const table = `| UserId | UserName | AccessToken | RefreshToken |
|--------|---------|--------------------|--------------|
${rows}`

      message.channel.send(`Hay ${users.length} usuarios en la base de datos:\n\`\`\`${table}\`\`\``)
    } catch (err) {
      console.error(err)
      message.channel.send('Ocurrió un error al intentar obtener los usuarios.')
    }
  }
})

client.login(process.env.BOT_TOKEN)
