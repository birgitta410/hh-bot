
describe('conversation', () => {

  const conversation = require('../bot/conversation');

  function spec(input, responseText, responseOptions) {
    const response = conversation.respond({ message: { message: { text: input }}});
    expect(response.text).toBe(responseText);
    expect(response.options).toEqual(responseOptions);
  }

  it('should respond to /start', () => {
    spec('/start', 
      'Hello, this is Hacking Health! What are you looking for?',
      [['I need some advice on a skin condition.'], ['Nothing, thanks, I ended up here by accident.']]);
  });

});
