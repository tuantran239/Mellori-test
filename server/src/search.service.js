const fs = require("fs");
const path = require("path");

exports.readCorpus = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "hemingway.txt"),
      "utf-8",
      (error, data) => {
        if (error) {
          throw error;
        }

        const corpus = data
          .split(/\r\n/)
          .join(" ")
          .split(/[\\",*().?\[\]:\t]/)
          .join("")
          .trim()
          .toLowerCase();
        resolve(corpus);
      }
    );
  });
};

exports.appendToCorpus = (newWord) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(
      path.join(__dirname, "hemingway.txt"),
      `\r\n${newWord}`,
      (error) => {
        if (error) {
          throw error;
        }
        resolve(true);
      }
    );
  });
};

exports.mostSimilar = (w1, w2) => {
  const word1 = w1.toLowerCase();
  const word2 = w2.toLowerCase();
  if (word1.search(word2) !== -1) {
    return word2.length / word1.length;
  }
  return 0;
};
