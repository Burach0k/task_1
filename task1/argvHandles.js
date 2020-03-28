const error = require("./error");

const actionHandle = data => {
  if (data === "encode" || data === "decode") {
    return data;
  } else {
    error(`Неверное значение для '-action' || '--a'`, 1);
  }
};

const shiftHandle = data => {
  if (data) {
    if (isInteger(data)) {
      return data;
    } else {
      error(`Значение для параметра '-shift' || '--s' должно быть целое число`, 8);
    }
  } else {
    error(`Неверное значение для '-shift' || '--s'`, 2);
  }
};

const inputHandle = data => {
  if (data) {
    return data;
  }
};

const outputtHandle = data => {
  if (data) {
    return data;
  }
};

const isInteger = (num) => num ^ 0 === num;

module.exports = {
  actionHandle,
  shiftHandle,
  inputHandle,
  outputtHandle
};
