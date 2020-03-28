const consts = require("./const");

module.exports = args => {
  const option = [];

  for (let index = consts.FIRST_CMD_ARG; index < args.length; index++) {
    const firstChar = `${args[index]}`[consts.FIRST_ELEMENT];
    const isNumber = isSecondCharNumber(args[index]);
    const element = {
      optionName: null,
      arguments: []
    };

    if (firstChar === consts.LINE_SYMBOL && !isNumber) {
      element.optionName = args[index];
      index++;

      let firstChar = `${args[index]}`[consts.FIRST_ELEMENT];
      let isNumber = isSecondCharNumber(args[index]);

      while ((firstChar !== consts.LINE_SYMBOL || isNumber) && args[index]) {
        element.arguments.push(args[index]);
        index++;

        firstChar = `${args[index]}`[consts.FIRST_ELEMENT];
        isNumber = isSecondCharNumber(args[index]);
      }

      index--;
    } else {
      return error;
    }

    option.push(element);
  }

  return option;
};

const getSecondCharCode = text => {
  const secondChar = `${text}`[consts.SECOND_ELEMENT];
  return secondChar ? secondChar.charCodeAt() : null;
};

const isSecondCharNumber = text => {
  const code = getSecondCharCode(text);
  return code >= consts.FIRST_NUMBER_CODE && code <= consts.LAST_NUMBER_CODE;
};
