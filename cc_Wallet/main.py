import asyncio
from wallet import Wallet

async def run():
    wallet = Wallet()
    while True:
        await wallet.main_menu()

if __name__ == "__main__":
    asyncio.run(run())
