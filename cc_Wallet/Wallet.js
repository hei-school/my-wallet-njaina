const promptSync = require('./PromptSync');
const walletFunc = require('./WalletFunc');

class Wallet {
    constructor() {
        this.items = [];
    }

    exit() {
        console.log('Exiting the application. Goodbye!');
        process.exit();
    }

    displayMenu(title, options) {
        console.log(`\n${title}:`);
        options.forEach((option, index) => console.log(`${index + 1}. ${option}`));
    }

    async mainMenu() {
        let continueFlag = true;

        while (continueFlag) {
            this.displayMenu('Main Menu', ['Manage PIT', 'Manage Wallet', 'Display All Items', 'Exit']);

            const option = await promptSync('Choose an option (1/2/3/4): ');

            switch (option) {
                case '1':
                    await this.managePIT();
                    break;
                case '2':
                    await this.manageWallet();
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

    async managePIT() {
        const pitOptions = ['Add NIC', 'Add Banking Card', 'Add Driving Licence', 'Add Visit Card', 'Add Identification Photo', 'Back to Main Menu'];
        this.displayMenu('Manage PIT Menu', pitOptions);

        const pitOption = await promptSync('Choose a PIT option (1/2/3/4/5/6): ');

        if (pitOption >= 1 && pitOption <= pitOptions.length - 1) {
            await this.addPIT(pitOptions[pitOption - 1].substring(4));
        } else if (pitOption === pitOptions.length) {
            console.log('Returning to Main Menu.');
        } else {
            console.log('Invalid PIT option. Please choose a number between 1 and 6.');
        }
    }

    async addPIT(pitType) {
        const result = walletFunc.addPITToWallet(this.items, pitType);
        result.messages.forEach(message => console.log(message));
    }

    displayAllItems() {
      console.log('\nAll Items in the Wallet:');
  
      let totalBalance = 0;
      let lastAction = '"added"';
  
      this.items.forEach((item, index) => {
          if (item.type === 'pit') {
              console.log(`-------------------PIT-----------------------`);
              console.log(`PIT ${index + 1}: ${item.pitType}`);
              console.log(`------------------MONEY----------------------`);
          } else if (item.type === 'money') {
              const action = item.amount > 0 ? 'added' : '"withdrawn"';
              lastAction = action;

              console.log(`Money ${index + 1}: Ar${item.amount.toFixed(2)} ${action}`);
              console.log(`---------------------------------------------`);
  
              totalBalance += item.amount;
          }
      });
  
      console.log(`\nTotal Balance: Ar${totalBalance.toFixed(2)} ${lastAction}`);
  }
  

    async manageWallet() {
        const walletOptions = ['Add Money', 'View Balance', 'Withdraw Money', 'Back to Main Menu'];
        this.displayMenu('Manage Wallet', walletOptions);

        const walletOption = await promptSync('Choose a Wallet option (1/2/3/4): ');

        if (walletOption >= 1 && walletOption <= walletOptions.length - 1) {
            await this.executeWalletOption(walletOptions[walletOption - 1]);
        } else if (walletOption === walletOptions.length) {
            console.log('Returning to Main Menu.');
        } else {
            console.log('Invalid Wallet option. Please choose a number between 1 and 4.');
        }
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
                console.log('Returning to Main Menu.');
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
}

module.exports = Wallet;
