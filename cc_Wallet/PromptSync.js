const readlineSync = require('./Readline');

function createPrompt() {
  return async function promptSync(question) {
    process.stdout.write(question);
    return await readlineSync();
  };
}

module.exports = createPrompt();