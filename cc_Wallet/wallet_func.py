class WalletFunc:
    def add_money(self, amount, current_balance):
        new_balance = current_balance + amount
        return {
            'success': True,
            'messages': ['Money added successfully!', f'Current balance: ${new_balance:.2f}'],
            'new_balance': new_balance
        }

    def view_money(self, current_balance):
        return {
            'success': True,
            'messages': [f'Current balance: ${current_balance:.2f}'],
            'new_balance': current_balance
        }

    def withdraw_money(self, amount, current_balance):
        if 0 <= amount <= current_balance:
            new_balance = current_balance - amount
            return {
                'success': True,
                'messages': ['Money withdrawn successfully!', f'Current balance: ${new_balance:.2f}'],
                'new_balance': new_balance
            }
        else:
            return {
                'success': False,
                'messages': ['Invalid withdrawal amount. Cannot withdraw more than the current balance.'],
                'new_balance': current_balance
            }
