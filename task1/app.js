const { actionHandle, shiftHandle, inputHandle, outputtHandle } = require("./argvHandles");
const encryptionStream = require("./encryptionStream");
const argvParser = require("./argvParser");
const error = require("./error");
require('./protectFiles');

const state = {
  action: null,
  shift: null,
  inputFile: null,
  outputFile: null
};

process.stdin.setEncoding("utf8");

const argv = argvParser(process.argv);

argv.forEach(arg => {
  const param = arg.arguments[0];

  switch (arg.optionName) {
    case "--action":
    case "-a":
      state.action = actionHandle(param);
      break;

    case "--shift":
    case "-s":
      state.shift = shiftHandle(param);
      break;

    case "--input":
    case "-i":
      state.inputFile = inputHandle(param);
      break;

    case "--output":
    case "-o":
      state.outputFile = outputtHandle(param);
      break;

    default:
      error(`Введен неизвестный параметр: ${arg.optionName}`, 4);
  }
});

encryptionStream(state);
