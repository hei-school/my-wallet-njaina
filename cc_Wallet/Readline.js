function readlineSync() {
    return new Promise((resolve) => {
      let input = '';
      process.stdin.setEncoding('utf8');
  
      const onData = (chunk) => {
        input += chunk;
        if (input.includes('\n')) {
          process.stdin.removeListener('data', onData);
          resolve(input.trim());
        }
      };
  
      process.stdin.on('data', onData);
    });
  }
  
  module.exports = readlineSync;  