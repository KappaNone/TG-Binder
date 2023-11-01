# TG-Binder

This application allows you to redirect content from one Telegram channel to another. It uses the `telegram` library to interact with the Telegram API and requires the presence of API ID and API Hash for authorization.

## Installation and Setup

1. Clone the repository or download the program's archive to your device.

2. Install the dependencies by running the following command:

   ```
   npm install
   ```

3. Create a `.env` file in the project's root directory and add the following environment variables:

   ```
   API_ID=YOUR_API_ID
   API_HASH=YOUR_API_HASH
   STRING_SESSION=YOUR_STRING_SESSION
   ```

   - `YOUR_API_ID` and `YOUR_API_HASH` can be obtained by creating an application on [Telegram API Development Tools](https://my.telegram.org/apps).
   - `YOUR_STRING_SESSION` is the generated session string, which you can obtain by running the code `client.session.save()` and copying the output value.

4. Make the necessary changes to the code by specifying the channel IDs from which the content will be taken (`sourceChannelId`) and to which it will be redirected (`finalChannelId`).

5. For authorization in the Telegram client, uncomment the following code block and handle the input requests (phone number, password, and confirmation code). Once successfully authorized, you can comment out this code block again.

   ```javascript
   // Authorization in the client

   {
      phoneNumber: async () => await input.text("Please enter your phone number: "),
      password: async () => await input.text("Please enter your password: "),
      phoneCode: async () =>
      await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
   }
   
   ```

## Running

Start the program by executing the following command:

```
npm start
```

The application will connect to the Telegram API and begin redirecting content from the source channel to the final channel. Every message published in the source channel will be sent to the final channel.

## Notes

- Please note that a working internet connection is required for the program to function properly.
- You can use the `client.getDialogs()` function to retrieve the IDs of all channels available to your Telegram account. Uncomment the corresponding code block in the program to display information about the channels and their IDs.
- Check the console logs to track messages and any potential errors.

That's it! Now you can use this application to redirect content between channels in Telegram.

