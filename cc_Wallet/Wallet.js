const promptSync = require('./PromptSync');
const WalletFunc = require('./WalletFunc');

class Wallet {
  constructor() {
    this.actualMoney = 0;
    this.walletFunc = new WalletFunc();
  }

  async addMoney() {
    let amount;
    do {
      const amountInput = await promptSync('Enter the amount to add: ');
      amount = parseFloat(amountInput);

      if (isNaN(amount)) {
        console.log('Please enter a valid number for the amount.');
      }
    } while (isNaN(amount));

    const result = this.walletFunc.addMoney(amount, this.actualMoney);
    this.displayRectangleMessage(...result.messages);
    this.actualMoney = result.newBalance;
  }

  async viewMoney() {
    const result = this.walletFunc.viewMoney(this.actualMoney);
    this.displayRectangleMessage(...result.messages);
  }

  async withdrawMoney() {
    let amount;
    do {
      const amountInput = await promptSync('Enter the amount to withdraw: ');
      amount = parseFloat(amountInput);

      if (isNaN(amount)) {
        console.log('Please enter a valid number for the amount.');
      }
    } while (isNaN(amount));

    const result = this.walletFunc.withdrawMoney(amount, this.actualMoney);
    this.displayRectangleMessage(...result.messages);
    if (result.success) {
      this.actualMoney = result.newBalance;
    }
  }

  displayRectangleMessage(...messages) {
    const maxLength = Math.max(...messages.map(message => message.length));

    console.log('\n' + '#'.repeat(maxLength + 6));
    messages.forEach(message => {
      const padding = ' '.repeat((maxLength - message.length) / 2);
      console.log(`## ${padding}${message}${padding} ##`);
    });
    console.log('#'.repeat(maxLength + 6) + '\n');
  }

  async manageWallet() {
    let continueFlag = true;

    while (continueFlag) {
      console.log('\nOptions:');
      console.log('1. Add Money');
      console.log('2. View Balance');
      console.log('3. Withdraw Money');
      console.log('4. Exit');

      const option = await promptSync('Choose an option (1/2/3/4): ');

      switch (option) {
        case '1':
          await this.addMoney();
          break;
        case '2':
          await this.viewMoney();
          break;
        case '3':
          await this.withdrawMoney();
          break;
        case '4':
          this.displayRectangleMessage('Exiting wallet management. Goodbye!');
          continueFlag = false;
          process.exit();
          break;
        default:
          this.displayRectangleMessage('Invalid option. Please choose 1, 2, 3, or 4.');
      }
    }
  }
}

module.exports = Wallet;
