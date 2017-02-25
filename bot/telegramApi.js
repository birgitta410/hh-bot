
const secrets = require('./secretsVault').secrets();

const telegram = require('telegram-bot-api');
const api = new telegram({
    token: secrets.telegram
});

exports.getPhoto = (id) => {
    console.log(`Trying to get a photo ${api}`);
    
    const promise = api.getFile({ file_id: id });
    console.log(`Promise ${promise}`);
    return promise.then(function(data) {
        console.log(`GOT THE FILE!`);
        console.log(`PHOTO DATA ${data.file_path}`);
        const imageUrl = `https://api.telegram.org/file/bot${secrets.telegram}/${data.file_path}`;
        return imageUrl;
    });
};
