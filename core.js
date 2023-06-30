require('dotenv').config();
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const { message } = require('telegram/client');

const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const stringSession = new StringSession("");

(async () => {
  console.log("Loading...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your phone number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");

  const channelUsername = await input.text("Please enter the username of the channel to listen to: ");
  const channel = await client.getEntity(channelUsername);

  if (!channel) {
    console.log("Channel not found.");
    return;
  }

  client.addEventHandler(async (event) => {
    if (event instanceof message) {
      const receivedMessage = event.message;
      await client.sendMessage("me", receivedMessage);
    }
  });

  console.log(`Listening to channel ${channelUsername}`);
})();
