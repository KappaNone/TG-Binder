require('dotenv').config();
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");


const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const stringSession = new StringSession(process.env.STRING_SESSION);


// The channel from which the content will be taken
const sourceChannelId =  'ENTER_YOUR_VALUE';
// The channel where the content will be redirected to
const finalChannelId = 'ENTER_YOUR_VALUE';


(async () => {
  console.log("Loading...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start(

    // Authorization in the client

    // {
    //   phoneNumber: async () => await input.text("Please enter your phone number: "),
    //   password: async () => await input.text("Please enter your password: "),
    //   phoneCode: async () =>
    //     await input.text("Please enter the code you received: "),
    //   onError: (err) => console.log(err),
    // }
  );
  
  // Get your stringSession
  // console.log(client.session.save())

  console.log("You should now be connected.");




  client.addEventHandler(async (event) => {

    if (event?.message?.peerId?.channelId?.value === sourceChannelId) {
      let msg = event.message.message
      console.log(msg);
      await client.sendMessage(finalChannelId, { message: msg })

      // Get all id of all channels in your client

      // const dialogs = await client.getDialogs();
      // dialogs.forEach(
      //   dialog => {
      //     if (dialog.isChannel) {
      //       console.log(dialog.title);
      //       console.log(dialog.id)
      //     }
      //   }
      // )
    }

  });

})();

