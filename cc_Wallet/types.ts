export interface WalletItem {
    type: string;
    pit_type?: string;
    amount?: number;
}

export interface WalletFuncResult {
    messages: string[];
}

export interface MainOptions {
    'Manage PIT': string[];
    'Manage Wallet': string[];
    'Main Menu': string[];
}
