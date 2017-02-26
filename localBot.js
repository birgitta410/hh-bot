const telegram = require('telegram-bot-api');
const secrets = require('./bot/secretsVault').secrets;
const conversation = require('./bot/conversation');
 
var api = new telegram({
    token: secrets.telegram,
    updates: {
      enabled: true
    }
});

const getPhoto = (id) => {
    console.log(`Trying to get a photo ${api}`);
    
    return api.getFile({ file_id: id }).then(function(data) {
        console.log(`GOT THE FILE!`);
        console.log(`PHOTO DATA ${data.file_path}`);
        const imageUrl = `https://api.telegram.org/file/bot${secrets.telegram}/${data.file_path}`;
        return imageUrl;
    });
};

api.on('message', function(message)
{
    console.log(message);
    
    const response = conversation.respond(message);
    
    const requestOptions = {
      chat_id: message.chat.id,
      text: response.text
    };

    if(response.fileId) {
      getPhoto(response.fileId).then(function(data) {
        console.log(`Got URL! ${data}`);
      });
    } else if(response.filePath) {
      requestOptions.photo = response.filePath;
      // requestOptions.caption = ...
      api.sendPhoto(requestOptions)
        .then(function(data) {
            console.log(`PHOTO SENT`);
        });
    } else {
      if(response.options) {
        requestOptions.reply_markup = JSON.stringify({
          keyboard: response.options,
          one_time_keyboard: true,
          resize_keyboard: true
        });
      }
      console.log(`Trying to send text response ${response.text}...`);
      api.sendMessage(requestOptions).then(function(data) {
          console.log(`MESSAGE SENT`);
      });
    }
    
});
