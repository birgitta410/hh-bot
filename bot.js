const botBuilder = require('claudia-bot-builder'),
    excuse = require('huh'),
    _ = require('lodash'),
    telegramTemplate = botBuilder.telegramTemplate,
    telegramApi = require('./bot/telegramApi');
    
module.exports = botBuilder(function (message) {

    const CMD_START = '/start';
    const NEED_ADVICE = 'I need some advice on a skin condition.';
    const NO_THANKS = 'Nothing, thanks, I ended up here by accident.';

    console.log(`Text ${message.text}`);
    console.log(`Type ${message.type}`); // telegram
    console.log(`originalRequest ${JSON.stringify(message.originalRequest)}`);
    console.log(`sender ${message.sender}`); // e.g. 302954515
    console.log(`postback ${message.postback}`); // true/false = is result of e.g. button click

    if(message.originalRequest && message.originalRequest.message && message.originalRequest.message.photo) {
        const photoInfo = message.originalRequest.message.photo;
        const fileId = _.last(photoInfo).file_id;
        console.log(`Received a photo! ${fileId}`)
        const photo = telegramApi.getPhoto(fileId).then((photoData) => {
            console.log(`I got the photo data! ${photoData}`);
            return new telegramTemplate.Photo(fileId, `I got your photo!`).get();
        }).catch((err) => {
            console.log(`Received an error trying to get photo... ${JSON.stringify(err)}`);
            return new telegramTemplate.Text('I could not store your photo, sorry...').get();
        });
        
    } else if(message.text === NEED_ADVICE) {
        return 'Hello from Hacking Health! Thanks for your interest.' +
          ` Unfortunately, this bot is not ready yet, because ${excuse.get()}.`;
    } else if(message.text === CMD_START) {
        return new telegramTemplate.Text(`Hello, this is Hacking Health! What are you looking for?`)
            .addReplyKeyboard([
            [ NEED_ADVICE ],
            [ NO_THANKS ]
          ], true, true)
            // .oneTimeKeyboard(true)
            .get()
    } else if(message.text === NO_THANKS) {
        return 'OK, have a nice day then.';
    } else {
        return `Sorry, I don\'t understand - type /start to begin. | Request: ${JSON.stringify(message.originalRequest.message)}`;
    }
    
});
