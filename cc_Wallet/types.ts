export interface WalletItem {
    type: string;
    pitType?: string;
    amount?: number;
}

export interface WalletFuncResult {
    messages: string[];
    success?: boolean;
}
