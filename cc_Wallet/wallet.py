from wallet_func import WalletFunc
import asyncio

class Wallet:
    def __init__(self):
        self.items = []

    def display_menu(self, title, options):
        print(f'\n{title}:')
        for index, option in enumerate(options, start=1):
            print(f'{index}. {option}')

    async def main_menu(self):
        continue_flag = True
        while continue_flag:
            self.display_menu('Main Menu', ['Manage PIT', 'Manage Money', 'Display All Items', 'Exit'])
            option = input('Choose an option (1/2/3/4): ')
            if option == '1':
                await self.manage_pit()
            elif option == '2':
                await self.manage_money()
            elif option == '3':
                self.display_all_items()
            elif option == '4':
                self.exit()
            else:
                print('Invalid option. Please choose 1, 2, 3, or 4.')

    async def manage_options(self, menu_title, options, action):
        self.display_menu(menu_title, options)
        option = input(f'Choose an option (1/{len(options)}): ')
        if option.isdigit() and 1 <= int(option) <= len(options):
            await action(options[int(option) - 1])
        elif option == str(len(options) + 1):
            print('Returning to Main Menu.')
        else:
            print(f'Invalid option. Please choose a number between 1 and {len(options) + 1}.')

    async def manage_pit(self):
        pit_options = ['Add NIC', 'Add Banking Card', 'Add Driving Licence', 'Add Visit Card', 'Add Identification Photo', 'Back to Main Menu']
        await self.manage_options('Manage PIT Menu', pit_options, self.add_pit)

    async def add_pit(self, pit_type):
        result = WalletFunc().add_pit_to_wallet(self.items, pit_type)
        for message in result['messages']:
            print(message)

    def display_all_items(self):
        print('\nAll Items in the Wallet:')
        total_balance = 0
        last_action = 'added'
        for index, item in enumerate(self.items, start=1):
            print(f'-------------------{"PIT" if item["type"] == "pit" else "MONEY"}-----------------------')
            if item['type'] == 'pit':
                print(f'PIT {index}: {item["pit_type"]}')
            elif item['type'] == 'money':
                action = 'added' if item['amount'] > 0 else 'withdrawn'
                print(f'Money {index}: Ar{item["amount"]:.2f} {action}')
                total_balance += item['amount']
        print(f'\nTotal Balance: Ar{total_balance:.2f} {last_action}')

    async def manage_money(self):
        wallet_options = ['Add Money', 'View Balance', 'Withdraw Money', 'Back to Main Menu']
        await self.manage_options('Manage Wallet', wallet_options, self.execute_wallet_option)

    async def execute_wallet_option(self, option):
        if option == 'Add Money':
            await self.add_money()
        elif option == 'View Balance':
            self.view_money()
        elif option == 'Withdraw Money':
            await self.withdraw_money()
        elif option == 'Back to Main Menu':
            print("------*---------*------")
            print('Returning to Main Menu.')
            print("------*---------*------")
        else:
            print('Invalid Wallet option. Please choose Add Money, View Balance, Withdraw Money, or Back to Main Menu.')

    async def add_money(self):
        amount = float(input('Enter the amount to add: '))
        result = WalletFunc().add_money_to_wallet(self.items, amount)
        for message in result['messages']:
            print(message)
        self.items.append({'type': 'money', 'amount': amount})

    def view_money(self):
        result = WalletFunc().view_money_in_wallet(self.items)
        for message in result['messages']:
            print(message)

    async def withdraw_money(self):
        amount = float(input('Enter the amount to withdraw: '))
        result = WalletFunc().withdraw_money_from_wallet(self.items, amount)
        for message in result['messages']:
            print(message)
        if result['success']:
            self.items.append({'type': 'money', 'amount': -amount})

    def exit(self):
        print('Exiting the application. Goodbye!')
        exit()

async def run():
    wallet = Wallet()
    while True:
        await wallet.main_menu()

if __name__ == "__main__":
    asyncio.run(run())
