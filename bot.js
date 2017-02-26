const botBuilder = require('claudia-bot-builder');
const telegramTemplate = botBuilder.telegramTemplate;
const conversation = require('./bot/conversation');
    
module.exports = botBuilder(function(message) {
    const response = conversation.respond(message);

    let template = new telegramTemplate.Text(response.text);

    if(response.options) {
        template = template.addReplyKeyboard(response.options, true, true)
    }
        
    return template.get()
});
