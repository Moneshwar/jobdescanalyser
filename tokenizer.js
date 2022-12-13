module.exports.tokenizer=async function (str) {
  const sw = require('remove-stopwords')
  function punctuationCleaner(rawString){
    var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    var cleanString = rawString.replace(regex, '');
    return cleanString;
  }
  function stopWordRemover(str){
    str=str.split(' ');
    var newString = sw.removeStopwords(str);
    return newString.join(' ');
  }
  function lowerCaseRemover(str){
    str=str.replace( /[a-z]/g, '' );
    return str;
  }
  function noiseRemover(str){
    str=str.replace(/[^a-z0-9 ,.?!]/ig, '')
    return str;
  }
    str=punctuationCleaner(str);
    //str=lowerCaseRemover(str);
    str=stopWordRemover(str);
    str=noiseRemover(str);
    return str;
}
