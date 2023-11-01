require('dotenv').config();
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const stringSession = new StringSession(process.env.STRING_SESSION);


//* The channel from which the content will be taken
const sourceChannelId = process.env.SOURCE_CHANNEL_ID;
//* The channel where the content will be redirected to
const finalChannelId = process.env.FINAL_CHANNEL_ID;

(async () => {
  console.log("Loading...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start(

    //* Authorization in the client

    {
      phoneNumber: async () => await input.text("Please enter your phone number: "),
      password: async () => await input.text("Please enter your password: "),
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    }
  );

  //* Get your stringSession
  console.log(client.session.save())
  
  console.log("You should now be connected.");

  //* Get all id of all channels in your client
  // const dialogs = await client.getDialogs();
  // dialogs.forEach((dialog) => {
  //   if (dialog.isChannel) {
  //     console.log(dialog.title);
  //     console.log(dialog.id);
  //   }
  // });

  client.addEventHandler(async (event) => {

    if (event.message?.peerId?.channelId?.value === sourceChannelId) {
      
      let msg = event.message.message
      console.log(msg);

      const firstCodePoint = msg.codePointAt(0);

      const isEmojiCharacter = isEmojiCodePoint(firstCodePoint);
      if (isEmojiCharacter) {
        await client.sendMessage(finalChannelId, { message: msg });
      }

    }

  });

  function isEmojiCodePoint(codePoint) {
    return (
      (codePoint >= 0x1F300 && codePoint <= 0x1F5FF) ||
      (codePoint >= 0x1F600 && codePoint <= 0x1F64F) ||
      (codePoint >= 0x1F680 && codePoint <= 0x1F6FF) ||
      (codePoint >= 0x2600 && codePoint <= 0x26FF) ||
      (codePoint >= 0x2700 && codePoint <= 0x27BF) ||
      (codePoint >= 0x1F900 && codePoint <= 0x1F9FF) ||
      (codePoint >= 0x1F1E6 && codePoint <= 0x1F1FF)
    );
  }



})();

