var botBuilder = require('claudia-bot-builder'),
    excuse = require('huh'),
    telegramTemplate = botBuilder.telegramTemplate;
    
module.exports = botBuilder(function (message) {

    const CMD_START = '/start';
    const NEED_ADVICE = 'I need some advice on a skin condition.';
    const NO_THANKS = 'Nothing, thanks, I ended up here by accident.';

    console.log(`Text ${message.text}`);
    console.log(`Type ${message.type}`); // telegram
    console.log(`originalRequest ${JSON.stringify(message.originalRequest)}`);
    console.log(`sender ${message.sender}`); // e.g. 302954515
    console.log(`postback ${message.postback}`); // true/false = is result of e.g. button click

    if(message.text === NEED_ADVICE) {
        return 'Hello from Hacking Health! Thanks for your interest.' +
          ` Unfortunately, this bot is not ready yet, because ${excuse.get()}.`;
    } else if(message.text === CMD_START) {
        return new telegramTemplate.Text(`Hello, this is Hacking Health! What are you looking for?`)
            .addReplyKeyboard([
            [ NEED_ADVICE ],
            [ NO_THANKS ]
            ])
            .get()
    } else if(message.text === NO_THANKS) {
        return 'OK, have a nice day then.';
    } else {
        return 'Sorry, I don\'t understand - type /start to begin.';
    }
    
});
