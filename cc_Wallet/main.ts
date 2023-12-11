import { Wallet } from './wallet';

async function run(): Promise<void> {
    const wallet = new Wallet();
    await wallet.run();
}

run();
