// wallet.ts
import { promptSync } from './promptSync';
import { WalletFunc } from './wallet_func';
import { WalletItem, WalletFuncResult } from './types';

export class Wallet {
    private items: WalletItem[] = [];

    displayMenu(title: string, options: string[]): void {
        console.log(`\n${title}:`);
        options.forEach((option, index) => console.log(`${index + 1}. ${option}`));
    }

    async mainMenu(): Promise<void> {
        let continueFlag = true;
        while (continueFlag) {
            this.displayMenu('Main Menu', ['Manage PIT', 'Manage Money', 'Display All Items', 'Exit']);
            const option = await promptSync('Choose an option (1/2/3/4): ');

            switch (option) {
                case '1':
                    await this.manageOptions('Manage PIT Menu', Wallet.PIT_MENU_OPTIONS, this.addPIT.bind(this));
                    break;
                case '2':
                    await this.manageOptions('Manage Wallet', Wallet.WALLET_MENU_OPTIONS, this.executeWalletOption.bind(this));
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

    async manageOptions(menuTitle: string, options: string[], action: (arg: string) => Promise<void>): Promise<void> {
        this.displayMenu(menuTitle, options);
        const option = await promptSync(`Choose an option (1/${options.length}): `);

        if (option >= '1' && option <= String(options.length)) {
            await action(options[parseInt(option) - 1]);
        } else if (option === String(options.length + 1)) {
            console.log('Returning to Main Menu.');
        } else {
            console.log(`Invalid option. Please choose a number between 1 and ${options.length + 1}.`);
        }
    }

    async addPIT(pitType: string): Promise<void> {
        const result = WalletFunc.addPITToWallet(this.items, pitType);
        this.displayResult(result);
    }

    displayAllItems(): void {
        console.log('\nAll Items in the Wallet:');

        let totalBalance = 0;
        let lastAction = 'added';

        this.items.forEach((item, index) => {
            console.log(`-------------------${item.type === 'pit' ? 'PIT' : 'MONEY'}-----------------------`);
            console.log(
                `${item.type === 'pit'
                    ? `PIT ${index + 1}: ${item.pitType}`
                    : `Ar${item.amount!.toFixed(2)} ${item.amount! > 0 ? 'added' : 'withdrawn'}`
                }`
            );

            if (item.type === 'money') {
                totalBalance += item.amount!;
            }
        });

        console.log(`\nTotal Balance: Ar${totalBalance.toFixed(2)} ${lastAction}`);
    }

    async executeWalletOption(option: string): Promise<void> {
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

    async addMoney(): Promise<void> {
        const amountInput = await promptSync('Enter the amount to add: ');
        const amount = parseFloat(amountInput);
        const result = WalletFunc.addMoneyToWallet(this.items, amount);
        this.displayResult(result);
    }

    async viewMoney(): Promise<void> {
        const result = WalletFunc.viewMoneyInWallet(this.items);
        this.displayResult(result);
    }

    async withdrawMoney(): Promise<void> {
        const amountInput = await promptSync('Enter the amount to withdraw: ');
        const amount = parseFloat(amountInput);
        const result = WalletFunc.withdrawMoneyFromWallet(this.items, amount);
        this.displayResult(result);
        if (result.success) {
            this.items.push({ type: 'money', amount: -amount });
        }
    }

    exit(): void {
        console.log('Exiting the application. Goodbye!');
        process.exit();
    }

    private displayResult(result: WalletFuncResult): void {
        result.messages.forEach(message => console.log(message));
    }
}
