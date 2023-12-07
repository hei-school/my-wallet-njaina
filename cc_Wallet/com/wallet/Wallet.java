package com.wallet;
import java.util.Scanner;

public class Wallet {
    private double actualMoney;
    private WalletFunc walletFunc;

    public Wallet() {
        this.actualMoney = 0;
        this.walletFunc = new WalletFunc();
    }

    public void addMoney() {
        try (Scanner scanner = new Scanner(System.in)) {
            double amount;
            do {
                System.out.print("Enter the amount to add: ");
                try {
                    amount = Double.parseDouble(scanner.nextLine());
                    if (amount < 0) {
                        System.out.println("Please enter a non-negative number for the amount.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Please enter a valid number for the amount.");
                    amount = -1; // Set to -1 to force the loop to continue
                }
            } while (amount < 0);

            WalletFunc.Result result = walletFunc.addMoney(amount, actualMoney);
            displayMessage(result.messages);
            actualMoney = result.newBalance;
        }
    }

    public void viewMoney() {
        WalletFunc.Result result = walletFunc.viewMoney(actualMoney);
        displayMessage(result.messages);
    }

    public void withdrawMoney() {
        try (Scanner scanner = new Scanner(System.in)) {
            double amount;
            do {
                System.out.print("Enter the amount to withdraw: ");
                try {
                    amount = Double.parseDouble(scanner.nextLine());
                    if (amount < 0) {
                        System.out.println("Please enter a non-negative number for the amount.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Please enter a valid number for the amount.");
                    amount = -1; // Set to -1 to force the loop to continue
                }
            } while (amount < 0);

            WalletFunc.Result result = walletFunc.withdrawMoney(amount, actualMoney);
            displayMessage(result.messages);
            if (result.success) {
                actualMoney = result.newBalance;
            }
        }
    }

    private void displayMessage(String... messages) {
        for (String message : messages) {
            System.out.println(message);
        }
    }

    public void manageWallet() {
        try (Scanner scanner = new Scanner(System.in)) {
            boolean continueFlag = true;

            while (continueFlag) {
                System.out.println("\nOptions:");
                System.out.println("1. Add Money");
                System.out.println("2. View Balance");
                System.out.println("3. Withdraw Money");
                System.out.println("4. Exit");

                System.out.print("Choose an option (1/2/3/4): ");
                String option = scanner.nextLine();

                switch (option) {
                    case "1":
                        addMoney();
                        break;
                    case "2":
                        viewMoney();
                        break;
                    case "3":
                        withdrawMoney();
                        break;
                    case "4":
                        displayMessage("Exiting wallet management. Goodbye!");
                        continueFlag = false;
                        break;
                    default:
                        displayMessage("Invalid option. Please choose 1, 2, 3, or 4.");
                }
            }
        }
    }
}
