
describe('melanomaAnalyser', () => {

  const melanomaAnalyser = require('../bot/melanomaAnalyser');

  xit('should work', (testDone) => {
    melanomaAnalyser.analyse('http://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/620/offlinehbpl.hbpl.co.uk/news/PGH/98E5945E-CD86-4080-4F23E476B7B43FEA.gif').then((data) => {
      console.log(`Got data ${JSON.stringify(data)}`);
      expect(data[0].result).toEqual('positive');
      testDone();
    }).done();
    
  });

});