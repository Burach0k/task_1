const fs = require("fs");

fs.chmod("./const.js", 0o444, err => {
  if (err) throw err;
});

fs.chmod("./app.js", 0o444, err => {
  if (err) throw err;
});

fs.chmod("./argvHandles.js", 0o444, err => {
  if (err) throw err;
});

fs.chmod("./argvParser.js", 0o444, err => {
  if (err) throw err;
});

fs.chmod("./encryptionStream.js", 0o444, err => {
  if (err) throw err;
});

fs.chmod("./error.js", 0o444, err => {
  if (err) throw err;
});

fs.chmod("./README.md", 0o444, err => {
  if (err) throw err;
});

fs.chmod("./transform.js", 0o444, err => {
  if (err) throw err;
});

fs.chmod("./protectFiles.js", 0o444, err => {
  if (err) throw err;
});
