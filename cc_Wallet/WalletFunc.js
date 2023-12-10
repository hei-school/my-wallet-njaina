const addPITToWallet = (items, pitType) => {
  const messages = [];

  if (pitType) {
    items.push({ type: 'pit', pitType });
    messages.push(`PIT (${pitType}) added successfully to the wallet.`);
  } else {
    messages.push('Invalid PIT type. PIT not added to the wallet.');
  }

  return { messages };
};

const addMoneyToWallet = (items, amount) => {
  const messages = [];

  if (!isNaN(amount) && amount > 0) {
    items.push({ type: 'money', amount });
    messages.push(`Ar${amount.toFixed(2)} added successfully to the wallet.`);
  } else {
    messages.push('Invalid amount. Money not added to the wallet.');
  }

  return { messages };
};

const viewMoneyInWallet = (items) => {
  const messages = [];
  let totalMoney = 0;

  items.forEach((item) => {
    if (item.type === 'money') {
      totalMoney += item.amount;
    }
  });

  messages.push(`Total Money in the wallet: Ar${totalMoney.toFixed(2)}`);
  return { messages };
};

const withdrawMoneyFromWallet = (items, amount) => {
  const messages = [];
  let totalMoney = 0;

  items.forEach((item) => {
    if (item.type === 'money') {
      totalMoney += item.amount;
    }
  });

  if (!isNaN(amount) && amount > 0 && amount <= totalMoney) {
    items.push({ type: 'money', amount: -amount });
    messages.push(`Ar${amount.toFixed(2)} withdrawn successfully from the wallet.`);
  } else {
    messages.push('Invalid amount. Money not withdrawn from the wallet.');
  }

  return { messages };
};

module.exports = {
  addPITToWallet,
  addMoneyToWallet,
  viewMoneyInWallet,
  withdrawMoneyFromWallet,
};
