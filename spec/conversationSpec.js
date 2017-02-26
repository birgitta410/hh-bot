
describe('conversation', () => {

  const conversation = require('../bot/conversation');

  it('should respond to /start', () => {
    const response = conversation.respond({ message: { message: { text: '/start' }}});
    expect(response.text).toBe('Hello, this is Hacking Health! What are you looking for?');
  });

});
