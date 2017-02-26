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
      
        if(result.result === 'negative') {
          if(result.confidence >= 0.8) {
            defer.resolve('Looks ok to me! Remember that I\'m not a doctor though, I make mistakes...');
          } else {
            defer.resolve('Looks ok - I\'m not quite sure though, so be sure to go to your doctor to get another opinion.');
          }
          
        } else if(result.result === "positive") {
          if(result.confidence >= 0.8) {
            defer.resolve('Oh-oh - go see a doctor!');
          } else {
            defer.resolve('I\'m not quite sure, maybe you should go see your doctor about this.');
          }
        } else {
          defer.resolve('I\'m having some trouble, please try again later');
        }
        
      }
        
    });
    return defer.promise;

};
