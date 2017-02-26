const Q = require('q');
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

    request(requestOptions, (error, response, body) => {
      if(error) {
        console.log('ERROR', 'failed to get ' + requestOptions.url, error);
        defer.reject(error);
      } else {
        const result = JSON.parse(body);
        defer.resolve(result);
      }
        
    });
    return defer.promise;

};
