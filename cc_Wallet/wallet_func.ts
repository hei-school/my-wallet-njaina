// wallet_func.ts
import { WalletItem, WalletFuncResult } from './types';

export class WalletFunc {
    static addPITToWallet(items: WalletItem[], pitType: string): WalletFuncResult {
        const messages: string[] = [];

        if (pitType) {
            items.push({ type: 'pit', pitType });
            messages.push(`PIT (${pitType}) added successfully to the wallet.`);
        } else {
            messages.push('Invalid PIT type. PIT not added to the wallet.');
        }

        return { messages };
    }

    static addMoneyToWallet(items: WalletItem[], amount: number): WalletFuncResult {
        const messages: string[] = [];

        if (typeof amount === 'number' && amount > 0) {
            items.push({ type: 'money', amount });
            messages.push(`Ar${amount.toFixed(2)} added successfully to the wallet.`);
        } else {
            messages.push('Invalid amount. Money not added to the wallet.');
        }

        return { messages };
    }

    static viewMoneyInWallet(items: WalletItem[]): WalletFuncResult {
        const messages: string[] = [];
        const totalMoney = items.reduce((sum, item) => (item.type === 'money' ? sum + item.amount! : sum), 0);

        messages.push(`Total Money in the wallet: Ar${totalMoney.toFixed(2)}`);
        return { messages };
    }

    static withdrawMoneyFromWallet(items: WalletItem[], amount: number): WalletFuncResult {
        const messages: string[] = [];
        const totalMoney = items.reduce((sum, item) => (item.type === 'money' ? sum + item.amount! : sum), 0);

        if (typeof amount === 'number' && amount > 0 && amount <= totalMoney) {
            items.push({ type: 'money', amount: -amount });
            messages.push(`Ar${amount.toFixed(2)} withdrawn successfully from the wallet.`);
        } else {
            messages.push('Invalid amount. Money not withdrawn from the wallet.');
        }

        return { messages, success: messages.length === 1 }; // Assuming success when only one message is present
    }
}
