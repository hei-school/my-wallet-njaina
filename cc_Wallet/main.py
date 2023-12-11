from wallet import Wallet
import asyncio

async def run():
    wallet = Wallet()
    while True:
        await wallet.main_menu()

if __name__ == "__main__":
    asyncio.run(run())
