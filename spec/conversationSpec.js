
describe('conversation', () => {

  const conversation = require('../bot/conversation');

  function spec(input, responseText, responseOptions, filePath) {
    const response = conversation.respond({ message: { text: input }});
    if(response.text === undefined) {
      expect(response.text).toBe(responseText);
    } else {
      expect(response.text).toContain(responseText);
    }
    
    expect(response.options).toEqual(responseOptions);
    expect(response.filePath).toBe(filePath);
  }

  describe('should respond to', () => {
    it('/start', () => {
      spec('/start', 
        'Hello, this is the Hacking Health bot! How can I help you?',
        [['I need some advice about skin cancer.'], ['I need an appointment with a dermatologist.']]);
    });

    // it('hi', () => {
    //   spec('hi', 
    //     'Hello, this is the Hacking Health bot! How can I help you?',
    //     [['I need some advice about skin cancer.'], ['I need an appointment with a dermatologist.']]);
    // });

    describe('need advice', () => {
      it('initial question', () => {
        spec('I need some advice about skin cancer.', 
          'Do you want me to have a look at a mole for you?',
          [['Yes, please!'], ['No, just some general info, please.']]);
      });
      it('answer yes', () => {
        spec('Yes, please!', 
          'Please upload an image of the mole that worries you');
      });
      it('answer no', () => {
        spec('No, just some general info, please.', 
          undefined, undefined, './skin-cancer-abcde.jpg');
      });
      it('upload picture', () => {
        const response = conversation.respond({ photo: [{ file_id: 'some-file-id' }] });
        expect(response.fileIdForAnalysis).toBe('some-file-id');
      });
    });

    describe('want appointment', () => {
      it('respond with a link', () => {
        spec('I need an appointment with a dermatologist.',
          'Here is a great site that will help you with that: https://my-dermatologist.com');
      });
    });
    
  });

});
