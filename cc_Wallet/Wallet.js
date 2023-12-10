const promptSync = require('./PromptSync');
const walletFunc = require('./WalletFunc');

class Wallet {
  constructor() {
    this.items = [];
  }

  displayMenu(title, options) {
    const MAIN_MENU_OPTIONS = ['Manage PIT', 'Manage Money', 'Display All Items', 'Exit'];
    const PIT_MENU_OPTIONS = ['Add NIC', 'Add Banking Card', 'Add Driving Licence', 'Add Visit Card', 'Add Identification Photo', 'Back to Main Menu'];
    const WALLET_MENU_OPTIONS = ['Add Money', 'View Balance', 'Withdraw Money', 'Back to Main Menu'];

    console.log(`\n${title}:`);
    options.forEach((option, index) => console.log(`${index + 1}. ${option}`));

    return { MAIN_MENU_OPTIONS, PIT_MENU_OPTIONS, WALLET_MENU_OPTIONS };
  }

  async mainMenu() {
    let continueFlag = true;

    while (continueFlag) {
      const { MAIN_MENU_OPTIONS } = this.displayMenu('Main Menu', ['Manage PIT', 'Manage Money', 'Display All Items', 'Exit']);

      const option = await promptSync('Choose an option (1/2/3/4): ');

      switch (option) {
        case '1':
          await this.manageOptions('Manage PIT Menu', ['Add NIC', 'Add Banking Card', 'Add Driving Licence', 'Add Visit Card', 'Add Identification Photo', 'Back to Main Menu'], this.addPIT.bind(this));
          break;
        case '2':
          await this.manageOptions('Manage Wallet', ['Add Money', 'View Balance', 'Withdraw Money', 'Back to Main Menu'], this.executeWalletOption.bind(this));
          break;
        case '3':
          this.displayAllItems();
          break;
        case '4':
          this.exit();
          break;
        default:
          console.log('Invalid option. Please choose 1, 2, 3, or 4.');
      }
    }
  }

  async manageOptions(menuTitle, options, action) {
    const { MAIN_MENU_OPTIONS } = this.displayMenu(menuTitle, options);

    const option = await promptSync(`Choose an option (1/${options.length}): `);

    if (option >= 1 && option <= options.length) {
      await action(options[option - 1]);
    } else if (option === options.length + 1) {
      console.log('Returning to Main Menu.');
    } else {
      console.log(`Invalid option. Please choose a number between 1 and ${options.length + 1}.`);
    }
  }
  async addPIT(pitType) {
    const result = walletFunc.addPITToWallet(this.items, pitType);
    result.messages.forEach(message => console.log(message));
  }

  displayAllItems() {
    console.log('\nAll Items in the Wallet:');

    let totalBalance = 0;
    let lastAction = 'added';

    this.items.forEach((item, index) => {
      console.log(`-------------------${item.type === 'pit' ? 'PIT' : 'MONEY'}-----------------------`);
      console.log(`${item.type === 'pit' ? 'PIT' : 'Money'} ${index + 1}: ${item.type === 'pit' ? item.pitType : `Ar${item.amount.toFixed(2)} ${item.amount > 0 ? '"added"' : '"withdrawn"'}`}`);
      
      if (item.type === 'money') {
        totalBalance += item.amount;
      }
    });

    console.log(`\nTotal Balance: Ar${totalBalance.toFixed(2)} "${lastAction}"`);
  }

  async executeWalletOption(option) {
    switch (option) {
      case 'Add Money':
        await this.addMoney();
        break;
      case 'View Balance':
        await this.viewMoney();
        break;
      case 'Withdraw Money':
        await this.withdrawMoney();
        break;
      case 'Back to Main Menu':
        console.log("------*---------*------");
        console.log('Returning to Main Menu.');
        console.log("------*---------*------");
        break;
      default:
        console.log('Invalid Wallet option. Please choose Add Money, View Balance, Withdraw Money, or Back to Main Menu.');
    }
  }

  async addMoney() {
    const amountInput = await promptSync('Enter the amount to add: ');
    const amount = parseFloat(amountInput);
    const result = walletFunc.addMoneyToWallet(this.items, amount);
    result.messages.forEach(message => console.log(message));
  }

  async viewMoney() {
    const result = walletFunc.viewMoneyInWallet(this.items);
    result.messages.forEach(message => console.log(message));
  }

  async withdrawMoney() {
    const amountInput = await promptSync('Enter the amount to withdraw: ');
    const amount = parseFloat(amountInput);
    const result = walletFunc.withdrawMoneyFromWallet(this.items, amount);
    result.messages.forEach(message => console.log(message));
  }

  exit() {
    console.log('Exiting the application. Goodbye!');
    process.exit();
  }
}

module.exports = Wallet;
