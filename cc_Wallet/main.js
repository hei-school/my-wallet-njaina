const Wallet = require('./Wallet');

async function main() {
  console.log('Welcome to the Wallet Management System!');

  const userWallet = new Wallet();

  userWallet.mainMenu();


  console.log('Thank you for using the Wallet Management System!');
}

main();
