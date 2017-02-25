const fs = require('fs');

describe('telegramApi', () => {

  const telegramApi = require('../bot/telegramApi');

  it('should get a photo from telegram', (testDone) => {
    telegramApi.getPhoto('AAQCABMVRUsNAAQ_ylxbrPYs5-zlAAIC').then((data) => {
      console.log(`Got data ${JSON.stringify(data)}`);
      testDone();
    }).done();
    
  });

});
