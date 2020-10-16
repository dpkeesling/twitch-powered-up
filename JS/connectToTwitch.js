'use strict'
// import the js library needed to work in twitch
const tmi = require('tmi.js')

// basic username and channel name for our specfic project Oauth_token is found in the config file
const BOT_USERNAME = 'twitchpoweredup'
const OAUTH_TOKEN = ''
const CHANNEL_NAME = 'twitchpoweredup'
let speed = 0

function main () {
  connectToTwitch()
}

function connectToTwitch () {
  const connectionObj = {
    identity: {
      username: BOT_USERNAME,
      password: OAUTH_TOKEN
    },
    channels: [
      CHANNEL_NAME
    ]
  }

  const client = new tmi.Client(connectionObj)

  // Registers our event handlers
  client.on('message', onMessageHandler)
  client.on('connected', onConnectedHandler)

  // Connect to Twitch
  client.connect()
}

// -1 means that nothing useful is passed
function parse (message) {
  let value = -1
  if (message === 'Stop') {
    value = 0
  } else if (message === 'Go') {
    value = 1
  }
  console.log('our value is:', value)
  return value
}

function onMessageHandler (target, context, msg, self) {
  // Ignore messages from the bot such as shout messages for user commands
  if (self) { return }

  // Remove whitespace from chat message
  const commandName = msg.trim()

  const value = parse(commandName)
  // console.log(commandName)
  if (value === 0 && speed > 0) {
    speed--
    console.log('our speed is now:', speed)
  } else if (value === 1) {
    speed++
    console.log('our speed is now:', speed)
  } else {
    console.log('no parseable command was entered!')
  }
}

// shows that we have connected to the twitch account
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}

main()