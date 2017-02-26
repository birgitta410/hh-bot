const Q = require('q');
const _ = require('lodash');
const request = require('request');

exports.analyse = (fileUrl) => {

  const defer = Q.defer();

    const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify([ { source: fileUrl } ]),
      url: 'http://192.168.179.149:8080/melanoma/predict'
    };

    console.log(`Sending request to predictor...`);

    request(requestOptions, (error, response, body) => {
      if(error) {
        console.log('ERROR', 'failed to get ' + requestOptions.url, error);
        defer.reject(error);
      } else {
        console.log(`Received a result ${body}`);
        const result = _.last(JSON.parse(body));
        
        defer.resolve('Thanks, we stored this picture so you can show it to your doctor ' +
          'at your next appointment.\n\n' +
          'EXCLUSIVELY FOR HACKING HEALTH DEMO\n' + 
          'Here is the result of the analysis prepared for the doctor!\n' +
          `Result: ${result.result} (is probably ${result.result === 'negative' ? 'benign' : 'malignant'})\n` +
          `Confidence in result: ${result.confidence}`);
        
      }
        
    });
    return defer.promise;

};
