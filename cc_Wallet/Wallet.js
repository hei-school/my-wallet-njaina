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
    async mainMenu() {
        let continueFlag = true;

        while (continueFlag) {
            console.log('\nMain Menu:');
            console.log('1. Manage PIT');
            console.log('2. Manage Wallet');
            console.log('3. Display All Items');
            console.log('4. Exit');

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
        console.log('\nManage PIT Menu:');
        console.log('1. Add NIC');
        console.log('2. Add Banking Card');
        console.log('3. Add Driving Licence');
        console.log('4. Add Visit Card');
        console.log('5. Add Identification Photo');
        console.log('6. Back to Main Menu');

        const pitOption = await promptSync('Choose a PIT option (1/2/3/4/5/6): ');

        switch (pitOption) {
            case '1':
                await this.addPIT('NIC');
                break;
            case '2':
                await this.addPIT('Banking Card');
                break;
            case '3':
                await this.addPIT('Driving Licence');
                break;
            case '4':
                await this.addPIT('Visit Card');
                break;
            case '5':
                await this.addPIT('Identification Photo');
                break;
            case '6':
                console.log('Returning to Main Menu.');
                break;
            default:
                console.log('Invalid PIT option. Please choose 1, 2, 3, 4, 5, or 6.');
        }
    }

    async addPIT(pitType) {
        const result = walletFunc.addPITToWallet(this.items, pitType);
        result.messages.forEach(message => console.log(message));
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
        console.log('\nManage money:');
        console.log('1. Add Money');
        console.log('2. View Balance');
        console.log('3. Withdraw Money');
        console.log('4. Back to Main Menu');

        const walletOption = await promptSync('Choose a Wallet option (1/2/3/4): ');

        switch (walletOption) {
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
                console.log('Returning to Main Menu.');
                break;
            default:
                console.log('Invalid Wallet option. Please choose 1, 2, 3, or 4.');
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
