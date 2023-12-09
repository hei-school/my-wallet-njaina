const readlineSync = require('./Readline');
const promptSync = require('./PromptSync');
const walletFunc = require('./WalletFunc');

class Wallet {
    constructor() {
        this.items = [];
    }

    async mainMenu() {
        let continueFlag = true;

        while (continueFlag) {
            console.log('\nMain Menu:');
            console.log('1. Manage PIT');
            console.log('2. Manage money');
            console.log('3. Display all items');
            console.log('4. Exit');


            const option = await promptSync('Choose an option (1/2/3): ');

            switch (option) {
                case '1':
                    await this.managePIT();
                    break;
                case '2':
                    await this.manageWallet();
                    break;
                case '3':
                    await this.displayAllItems();
                    break;
                case '4':
                    console.log('Exiting the application. Goodbye!');
                    continueFlag = false;
                    break;
                default:
                    console.log('Invalid option. Please choose 1, 2, 3, or 4.');
            }
        }
    }

    async managePIT() {
        let continueFlag = true;

        while (continueFlag) {
            console.log('\nOptions for Managing PIT:');
            console.log('1. Add PIT');
            console.log('2. Display PIT');
            console.log('3. Back to Main Menu');

            const option = await promptSync('Choose an option (1/2/3): ');

            switch (option) {
                case '1':
                    await this.addPIT();
                    break;
                case '2':
                    this.displayPIT();
                    break;
                case '3':
                    continueFlag = false;
                    break;
                default:
                    console.log('Invalid option. Please choose 1, 2 or 3.');
            }
        }
    }

    async addPIT() {
        console.log('\nAdding a PIT to the wallet:');
        console.log('1. NIC');
        console.log('2. Banking Card');
        console.log('3. Driving Licence');
        console.log('4. Visit Card');
        console.log('5. Identification Photo');

        const pitTypeInput = await promptSync('Choose the PIT type (1/2/3/4/5): ');
        const pitType = this.mapPITType(parseInt(pitTypeInput));

        if (pitType) {
            const result = walletFunc.addPITToWallet(this.items, pitType);
            console.log(...result.messages);
        } else {
            console.log('Invalid PIT type. Please choose a valid option.');
        }
    }

    mapPITType(type) {
        switch (type) {
            case 1:
                return 'NIC';
            case 2:
                return 'Banking Card';
            case 3:
                return 'Driving Licence';
            case 4:
                return 'Visit Card';
            case 5:
                return 'Identification Photo';
            default:
                return null;
        }
    }

    displayPIT() {
        console.log('\nYour PIT lists:');
        this.items.forEach((item, index) => {
            if (item.type === 'pit') {
                console.log(`PIT ${index + 1}: ${item.pitType}`);
            }
        });
    }

    displayAllItems() {
      console.log('\nAll Items in the Wallet:');

      this.items.forEach((item, index) => {
          if (item.type === 'pit') {
              console.log(`PIT ${index + 1}: ${item.pitType}`);
          } else if (item.type === 'money') {
              const action = item.amount > 0 ? 'added' : 'withdrawn';
              console.log(`Money ${index + 1}: $${Math.abs(item.amount).toFixed(2)} ${action}`);
          }
      });
  }


    async manageWallet() {
        let continueFlag = true;

        while (continueFlag) {
            console.log('\nOptions for Managing Wallet:');
            console.log('1. Add Money');
            console.log('2. View Balance');
            console.log('3. Withdraw Money');
            console.log('4. Back to Main Menu');

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
                    continueFlag = false;
                    break;
                default:
                    console.log('Invalid option. Please choose 1, 2, 3, or 4.');
            }
        }
    }

    async addMoney() {
        const amountInput = await promptSync('Enter the amount to add: ');
        const amount = parseFloat(amountInput);

        if (!isNaN(amount)) {
            const result = walletFunc.addMoneyToWallet(this.items, amount);
            console.log(...result.messages);
        } else {
            console.log('Please enter a valid number for the amount.');
        }
    }

    async viewMoney() {
        const result = walletFunc.viewMoneyInWallet(this.items);
        console.log(...result.messages);
    }

    async withdrawMoney() {
        const amountInput = await promptSync('Enter the amount to withdraw: ');
        const amount = parseFloat(amountInput);

        if (!isNaN(amount)) {
            const result = walletFunc.withdrawMoneyFromWallet(this.items, amount);
            console.log(...result.messages);
        } else {
            console.log('Please enter a valid number for the amount.');
        }
    }
}

module.exports = Wallet;