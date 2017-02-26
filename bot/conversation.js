const excuse = require('huh'),
    _ = require('lodash'),
    telegramApi = require('./telegramApi');

exports.respond = function (message) {

    const CMD_START = '/start';
    const HI = ['Hi', 'hi', 'hallo', 'Hallo'];
    const NEED_ADVICE = 'I need some advice on a skin condition.';
    const NO_THANKS = 'Nothing, thanks, I ended up here by accident.';

    const messageText = message.message ? message.message.text : message.text;

    console.log(`Text ${messageText}`);
    
    if(message.originalRequest && message.originalRequest.message && message.originalRequest.message.photo) {
        const photoInfo = message.originalRequest.message.photo;
        const fileId = _.last(photoInfo).file_id;
        console.log(`Received a photo! ${fileId}`)
        return {
          text: `Received a photo ${fileId}`,
          fileId: fileId
        };
    } else if(message.photo) {
      const photoInfo = message.photo;
      const fileId = _.last(photoInfo).file_id;
      console.log(`Received a photo! ${fileId}`)
      return {
        text: `Received a photo ${fileId}`,
        fileId: fileId
      };
    } else if(message.originalRequest && message.originalRequest.message && message.originalRequest.message.document) {
        console.log(`Received a document`);
        const documentInfo = message.originalRequest.message.document;
        return { text: `File is at https://api.telegram.org/file/bot<SECRET>/${documentInfo.file_path}` };
    } else if(messageText === NEED_ADVICE) {
        return { text: 'Hello from Hacking Health! Thanks for your interest.' +
          ` Unfortunately, this bot is not ready yet, because ${excuse.get()}.` };
    } else if(messageText === CMD_START || _.find(HI, messageText) !== undefined) {
      return { 
        text: `Hello, this is Hacking Health! What are you looking for?`,
        options: [
            [ NEED_ADVICE ],
            [ NO_THANKS ]
          ]
      };
    } else if(messageText === NO_THANKS) {
        return { text: 'OK, have a nice day then.' };
    } else {
        return { text: `Sorry, I don\'t understand - type /start to begin. | Request: ${JSON.stringify(message)}` };
    }
    
};