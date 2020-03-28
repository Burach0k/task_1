const { Transform } = require("stream");
const consts = require("./const");

module.exports = class myTransform extends Transform {
  constructor(count, isEncode) {
    super();

    this.count = count;
    this.isEncode = isEncode;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = this.getCaesarCode(
        chunk.toString("utf8"),
        this.count
      );

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }

  getCaesarCode(text, count) {
    const currentCount = this.getCorrectCount(count, this.isEncode);

    return [...text]
      .map(char => {
        let code = char.charCodeAt();

        if (
          code >= consts.FIRST_UP_CHAR_CODE &&
          code <= consts.LAST_UP_CHAR_CODE
        ) {
          if (code + currentCount > consts.LAST_UP_CHAR_CODE) {
            code = code - consts.ALPHABET_LENGTH + currentCount;
          } else {
            code += currentCount;
          }
        } else if (
          code >= consts.FIRST_LOWER_CHAR_CODE &&
          code <= consts.LAST_LOWER_CHAR_CODE
        ) {
          if (code + currentCount > consts.LAST_LOWER_CHAR_CODE) {
            code = code - consts.ALPHABET_LENGTH + currentCount;
          } else {
            code += currentCount;
          }
        }

        return String.fromCharCode(code);
      })
      .join("");
  }

  getCorrectCount(count, isEncode) {
    const signedCount = count * (isEncode ? 1 : -1)
    const isMinus = signedCount < 0;
    let currentCount = Math.abs(count);

    if (currentCount > consts.ALPHABET_LENGTH) {
      const newCount = currentCount - consts.ALPHABET_LENGTH;
      currentCount = this.getCorrectCount(newCount, isEncode);
    }

    if (isMinus) {
      currentCount = consts.ALPHABET_LENGTH - currentCount;
    }

    return currentCount;
  }
};
