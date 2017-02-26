const telegram = require('telegram-bot-api');
const secrets = require('./bot/secretsVault').secrets;
const conversation = require('./bot/conversation');
const melanomaAnalyser = require('./bot/melanomaAnalyser');
 
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

const sendText = (requestOptions) => {
  api.sendMessage(requestOptions).then(function(data) {
    console.log(`MESSAGE SENT`);
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

    if(response.fileIdForAnalysis) {
      getPhoto(response.fileIdForAnalysis).then(function(fileUrl) {
        console.log(`Got URL! ${fileUrl}`);
        requestOptions.text = 'I received your image. Give me some time to look at this, I\'ll get back to you shortly.';
        sendText(requestOptions);
        melanomaAnalyser.analyse(fileUrl).then((analysisResultText) => {
          console.log(`analysis result ${analysisResultText}`);
          requestOptions.text = analysisResultText;
          sendText(requestOptions);
        }).done();
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
      sendText(requestOptions);
    }
    
});
