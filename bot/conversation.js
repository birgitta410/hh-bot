const excuse = require('huh'),
    _ = require('lodash'),
    telegramApi = require('./telegramApi');

exports.respond = function (message) {

    const CMD_START = '/start';
    const HI = ['Hi', 'hi', 'hallo', 'Hallo'];
    const NEED_ADVICE = 'I need some advice about skin cancer.';
    const NEED_APPOINTMENT = 'I need an appointment with a dermatologist.';
    const DO_YOU_WANT_ME_TO_LOOK = 'Do you want me to have a look at a mole for you?';
    const YES_PLEASE_ADVICE = 'Yes, please!';
    const PLEASE_UPLOAD_MOLE = 'Please upload an image of the mole that worries you';
    const NO_ADVICE_JUST_INFO = 'No, just some general info, please.';

    const messageText = message.message ? message.message.text : message.text;

    console.log(`RECEIVED MESSAGE: ${messageText}`);
    
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
        fileIdForAnalysis: fileId
      };
    } else if(message.originalRequest && message.originalRequest.message && message.originalRequest.message.document) {
        console.log(`Received a document`);
        const documentInfo = message.originalRequest.message.document;
        return { text: `File is at https://api.telegram.org/file/bot<SECRET>/${documentInfo.file_path}` };
    } else if(messageText === NEED_ADVICE) {
        return { text: 'Do you want me to have a look at a mole for you?',
          options: [[YES_PLEASE_ADVICE], [NO_ADVICE_JUST_INFO]] };
    } else if(messageText === YES_PLEASE_ADVICE) {
      return { text: PLEASE_UPLOAD_MOLE };
    } else if(messageText === NO_ADVICE_JUST_INFO) {
      return { filePath: './skin-cancer-abcde.jpg' };
    } else if(messageText === CMD_START || _.find(HI, (el) => { return el === messageText; }) !== undefined) {
      return { 
        text: `Hello, this is the Hacking Health bot! How can I help you?`,
        options: [
            [ NEED_ADVICE ],
            [ NEED_APPOINTMENT ],
            ['Cancel']
          ]
      };
    } else if(messageText === NEED_APPOINTMENT) {
      return { text: 'Here is a great site that will help you with that: https://my-dermatologist.com. Thanks for chatting with me, see you soon!' };
    } else if(messageText === DO_YOU_WANT_ME_TO_LOOK) {
      return {
        text: 'Do you want me to have a look at a mole for you?',
        options: [['Yes, please!'], ['No, just some general info, please.']]
      };
    } else if(messageText === 'Cancel') {
      return { text: 'Ok, see you soon.' };
    } else {
      return { text: `Sorry, I don\'t understand - type /start to begin. | Request: ${JSON.stringify(message)}` };
    }
    
};