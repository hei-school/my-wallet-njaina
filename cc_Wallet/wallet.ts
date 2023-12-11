import { promptSync } from './PromptSync';
import { WalletFunc } from './WalletFunc';
import { WalletItem } from './types';
export class Wallet {
    private items: WalletItem[] = [];

    private displayMenu(title: string, options: string[]): void {
        console.log(`\n${title}:`);
        options.forEach((option, index) => console.log(`${index + 1}. ${option}`));
    }

    private async manageOptions(menuTitle: string, options: string[], action: (arg: string) => Promise<void>): Promise<void> {
        this.displayMenu(menuTitle, options);
        const option = await promptSync(`Choose an option (1/${options.length}): `);

        if (parseInt(option) >= 1 && parseInt(option) <= options.length) {
            await action(options[parseInt(option) - 1]);
        } else if (parseInt(option) === options.length + 1) {
            console.log('Returning to Main Menu.');
        } else {
            console.log(`Invalid option. Please choose a number between 1 and ${options.length + 1}.`);
        }
    }

    private async addPIT(pitType: string): Promise<void> {
        const result = WalletFunc.addPITToWallet(this.items, pitType);
        result.messages.forEach(message => console.log(message));
    }


    private displayAllItems(): void {
        console.log('\nAll Items in the Wallet:');
        let totalBalance = 0;
        let lastAction = 'added';

        this.items.forEach((item, index) => {
            console.log(`-------------------${item.type === 'pit' ? 'PIT' : 'MONEY'}-----------------------`);

            if (item.type === 'pit') {
                console.log(`PIT ${index + 1}: ${item.pit_type}`);
            } else if (item.type === 'money') {
                const action = item.amount && item.amount > 0 ? 'added' : 'withdrawn';
                console.log(`Money ${index + 1}: Ar${item.amount?.toFixed(2)} ${action}`);
                totalBalance += item.amount || 0;
            }
        });

        console.log(`\nTotal Balance: Ar${totalBalance.toFixed(2)} ${lastAction}`);
    }

    private async manageMoney(): Promise<void> {
        const walletOptions: string[] = ['Add Money', 'View Balance', 'Withdraw Money', 'Back to Main Menu'];
        await this.manageOptions('Manage Wallet', walletOptions, this.executeWalletOption.bind(this));
    }

    private async executeWalletOption(option: string): Promise<void> {
        switch (option) {
            case 'Add Money':
                await this.addMoney();
                break;
            case 'View Balance':
                this.viewMoney();
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

    private async addMoney(): Promise<void> {
        const amountInput = await promptSync('Enter the amount to add: ');
        const amount = parseFloat(amountInput);
        const result = WalletFunc.addMoneyToWallet(this.items, amount);
        result.messages.forEach(message => console.log(message));
    }

    private viewMoney(): void {
        const result = WalletFunc.viewMoneyInWallet(this.items);
        result.messages.forEach(message => console.log(message));
    }

    private async withdrawMoney(): Promise<void> {
        const amountInput = await promptSync('Enter the amount to withdraw: ');
        const amount = parseFloat(amountInput);
        const result = WalletFunc.withdrawMoneyFromWallet(this.items, amount);
        result.messages.forEach(message => console.log(message));
    }

    private exit(): void {
        console.log('Exiting the application. Goodbye!');
        process.exit();
    }
    public async run(): Promise<void> {
        while (true) {
            await this.mainMenu();
        }
    }

    private async mainMenu(): Promise<void> {
        let continueFlag: boolean = true;

        while (continueFlag) {
            this.displayMenu('Main Menu', ['Manage PIT', 'Manage Money', 'Display All Items', 'Exit']);
            const option: string = await promptSync('Choose an option (1/2/3/4): ');

            switch (option) {
                case '1':
                    await this.manageOptions('Manage PIT Menu', ['Add NIC', 'Add Banking Card', 'Add Driving Licence', 'Add Visit Card', 'Add Identification Photo', 'Back to Main Menu'], this.addPIT.bind(this));
                    break;
                case '2':
                    await this.manageMoney();
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
}
