from .wallet_func import WalletFunc
from .prompt_sync import prompt_sync

class Wallet:
    def __init__(self):
        self.actual_money = 0
        self.wallet_func = WalletFunc()

    def add_money(self):
        amount = float(prompt_sync("Enter the amount to add: "))
        result = self.wallet_func.add_money(amount, self.actual_money)
        self.display_message(*result['messages'])
        self.actual_money = result['new_balance']

    def view_money(self):
        result = self.wallet_func.view_money(self.actual_money)
        self.display_message(*result['messages'])

    def withdraw_money(self):
        amount = float(prompt_sync("Enter the amount to withdraw: "))
        result = self.wallet_func.withdraw_money(amount, self.actual_money)
        self.display_message(*result['messages'])
        if result['success']:
            self.actual_money = result['new_balance']

    def display_message(self, *messages):
        for message in messages:
            print(message)

    def manage_wallet(self):
        continue_flag = True

        while continue_flag:
            print("\nOptions:")
            print("1. Add Money")
            print("2. View Balance")
            print("3. Withdraw Money")
            print("4. Exit")

            option = input("Choose an option (1/2/3/4): ")

            if option == '1':
                self.add_money()
            elif option == '2':
                self.view_money()
            elif option == '3':
                self.withdraw_money()
            elif option == '4':
                self.display_message("Exiting wallet management. Goodbye!")
                continue_flag = False
            else:
                self.display_message("Invalid option. Please choose 1, 2, 3, or 4.")
