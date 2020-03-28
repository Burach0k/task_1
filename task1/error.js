module.exports = (message, code) => {
  process.stderr.write(message);
  process.exit(code);
};
