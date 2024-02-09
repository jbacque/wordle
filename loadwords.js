// Load all words into an array
let allWords;
fetch("all-words.txt").then(convertData).then(processData);

// convert file contents to string
function convertData(rawData) {
  return rawData.text();
}

function processData(textData) {
  allWords = textData.split("\n");
}
