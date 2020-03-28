const { pipeline } = require("stream");
const fs = require("fs");

const transform = require("./transform");
const error = require("./error");

module.exports = state => {
  if (state.outputFile && state.outputFile === state.inputFile) {
    error('Указаны одинаковые файлы для чтения и записи', 3);
  }

  const isEncode = state.action === "encode";
  const transformStream = new transform(state.shift, isEncode);
  const readStream = state.outputFile
    ? fs.createReadStream(state.outputFile, { highWaterMark: 64 })
    : process.stdin;

  const writeStream = state.inputFile
    ? fs.createWriteStream(state.inputFile, { flags: "a", highWaterMark: 64 })
    : process.stdout;

  pipeline(readStream, transformStream, writeStream, err => {
    if (err) {
      if (err.code === 'ENOENT') {
        error("Неправильный путь к файлу: файл отсутствует или к нему невозможен доступ", 6);
      } else if (err.code === 'EPERM') {
        error(`Файл ${state.inputFile} нельзя указывать для редкатрирования`, 7);
      } else {
        error("Неизвестная ошибка", 5);
      }
    }
  });
};
