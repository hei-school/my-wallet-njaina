class WalletFunc {
  addMoney(amount, currentBalance) {
    return {
      success: true,
      messages: [
        'Money added successfully!',
        `Current balance: $${(currentBalance + amount).toFixed(2)}`
      ],
      newBalance: currentBalance + amount
    };
  }

  viewMoney(currentBalance) {
    return {
      success: true,
      messages: [`Current balance: $${currentBalance.toFixed(2)}`]
    };
  }

  withdrawMoney(amount, currentBalance) {
    if (currentBalance >= amount && amount >= 0) {
      return {
        success: true,
        messages: [
          'Money withdrawn successfully!',
          `Current balance: $${(currentBalance - amount).toFixed(2)}`
        ],
        newBalance: currentBalance - amount
      };
    } else {
      return {
        success: false,
        messages: ['<!>Invalid withdrawal amount. Cannot withdraw more than the current balance.']
      };
    }
  }
}

module.exports = WalletFunc;
