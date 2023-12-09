# Wallet Management Application

This is a simple command-line application for managing a wallet with owners and their actual money balances and also some personal identification tools he have.

# Some features
## ``I`` - ***``PIT (stand for:Personal Identification Tools)``***
**Functionality:**
`` You can put your CIN in one of the pockets in the wallet``
* #### ``1`` - ***``NIC``***
* #### ``2`` - ***``Bancking card``***
* #### ``3`` - ***``Driving licence``***
* #### ``4`` - ***``Visit card``***
* #### ``5`` - ***``Identification Photo``***

## ``II`` - ***``Money storage``***
#### ``1`` - ***``Money``***
1. ***Add money:***
   - Enter the amount you want to add to your wallet.
   - The application will display a success message along with the updated balance.

2. ***View Balance:***
   - Displays the current balance in your wallet.

3. ***Withdraw Money:***
   - Enter the amount you want to withdraw from your wallet.
   - The application checks if the withdrawal amount is valid (not exceeding the current balance).
   - Displays a success message if the withdrawal is successful, along with the updated balance.
   - If the withdrawal amount is invalid, an error message is shown.
4. ***Exit:***
    - Choose this option to exit the wallet checking application.

# Getting Started

### ``Prerequisites``

- Node.js installed on your machine.

### ``Installation``

1. Clone the repository:

   ```bash
   git clone https://github.com/hei-school/cc-d1-my-wallet-njaina.git

2. Navigate to the project directory:
    ```bash
     cd cc_Wallet
3. Usage: 
``  Run the application's bootstrap``
    ```bash
   node main.js