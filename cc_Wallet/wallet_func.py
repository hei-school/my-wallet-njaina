class WalletFunc:
    @staticmethod
    def add_pit_to_wallet(items, pit_type):
        messages = []
        if pit_type:
            items.append({'type': 'pit', 'pit_type': pit_type})
            messages.append(f'PIT ({pit_type}) added successfully to the wallet.')
        else:
            messages.append('Invalid PIT type. PIT not added to the wallet.')
        return {'messages': messages}

    @staticmethod
    def add_money_to_wallet(items, amount):
        messages = []
        if isinstance(amount, (int, float)) and amount > 0:
            items.append({'type': 'money', 'amount': amount})
            messages.append(f'Ar{amount:.2f} added successfully to the wallet.')
        else:
            messages.append('Invalid amount. Money not added to the wallet.')
        return {'messages': messages}

    @staticmethod
    def view_money_in_wallet(items):
        messages = []
        total_money = sum(item['amount'] for item in items if item['type'] == 'money')
        messages.append(f'Total Money in the wallet: Ar{total_money:.2f}')
        return {'messages': messages}

    @staticmethod
    def withdraw_money_from_wallet(items, amount):
        messages = []
        total_money = sum(item['amount'] for item in items if item['type'] == 'money')
        if isinstance(amount, (int, float)) and amount > 0 and amount <= total_money:
            items.append({'type': 'money', 'amount': -amount})
            messages.append(f'Ar{amount:.2f} withdrawn successfully from the wallet.')
        else:
            messages.append('Invalid amount. Money not withdrawn from the wallet.')
        return {'messages': messages}
