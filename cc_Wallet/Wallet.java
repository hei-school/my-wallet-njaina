import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Wallet {
    private List<WalletItem> items = new ArrayList<>();
    private Scanner scanner = new Scanner(System.in);

    private interface OptionHandler {
        void handleOption();
    }

    private void displayMenu(String title, String[] options) {
        System.out.println("\n" + title + ":");
        for (int i = 0; i < options.length; i++) {
            System.out.println((i + 1) + ". " + options[i]);
        }
    }

    private void manageOptions(String menuTitle, String[] options, OptionHandler optionHandler) {
        displayMenu(menuTitle, options);
        System.out.print("Choose an option (1/" + options.length + "): ");
        int option = scanner.nextInt();

        if (option >= 1 && option <= options.length) {
            optionHandler.handleOption();
        } else if (option == options.length + 1) {
            System.out.println("Returning to Main Menu.");
        } else {
            System.out.println("Invalid option. Please choose a number between 1 and " + (options.length + 1) + ".");
        }
    }

    private void addPIT() {
        System.out.print("Enter the PIT type: ");
        String pitType = scanner.next();
        WalletFunc.addPITToWallet(items, pitType);
    }

    private void displayAllItems() {
        System.out.println("\nAll Items in the Wallet:");
        double totalBalance = 0;
        String lastAction = "added";

        for (int i = 0; i < items.size(); i++) {
            WalletItem item = items.get(i);
            System.out.println("-------------------" + (item.getType().equals("pit") ? "PIT" : "MONEY") + "-----------------------");

            if (item.getType().equals("pit")) {
                System.out.println("PIT " + (i + 1) + ": " + item.getPitType());
            } else if (item.getType().equals("money")) {
                String action = (item.getAmount() > 0) ? "added" : "withdrawn";
                System.out.println("Money " + (i + 1) + ": Ar" + item.getAmount() + " " + action);
                totalBalance += item.getAmount();
            }
        }

        System.out.println("\nTotal Balance: Ar" + totalBalance + " " + lastAction);
    }

    private void manageMoney() {
        displayMenu("Manage Wallet", new String[]{"Add Money", "View Balance", "Withdraw Money", "Back to Main Menu"});
        System.out.print("Choose an option (1/2/3/4): ");
        int option = scanner.nextInt();

        switch (option) {
            case 1:
                addMoney();
                break;
            case 2:
                viewMoney();
                break;
            case 3:
                withdrawMoney();
                break;
            case 4:
                System.out.println("------*---------*------");
                System.out.println("Returning to Main Menu.");
                System.out.println("------*---------*------");
                break;
            default:
                System.out.println("Invalid Wallet option. Please choose Add Money, View Balance, Withdraw Money, or Back to Main Menu.");
        }
    }

    private void addMoney() {
        System.out.print("Enter the amount to add: ");
        double amount = scanner.nextDouble();
        WalletFunc.addMoneyToWallet(items, amount);
    }

    private void viewMoney() {
        WalletFunc.viewMoneyInWallet(items);
    }

    private void withdrawMoney() {
        System.out.print("Enter the amount to withdraw: ");
        double amount = scanner.nextDouble();
        WalletFunc.withdrawMoneyFromWallet(items, amount);
    }

    private void exit() {
        System.out.println("Exiting the application. Goodbye!");
        System.exit(0);
    }

    public void mainMenu() {
        boolean continueFlag = true;

        while (continueFlag) {
            displayMenu("Main Menu", new String[]{"Manage PIT", "Manage Money", "Display All Items", "Exit"});
            System.out.print("Choose an option (1/2/3/4): ");
            int option = scanner.nextInt();

            switch (option) {
                case 1:
                    manageOptions("Manage PIT Menu", new String[]{"Add NIC", "Add Banking Card", "Add Driving Licence", "Add Visit Card", "Add Identification Photo", "Back to Main Menu"}, this::addPIT);
                    break;
                case 2:
                    manageMoney();
                    break;
                case 3:
                    displayAllItems();
                    break;
                case 4:
                    exit();
                    break;
                default:
                    System.out.println("Invalid option. Please choose 1, 2, 3, or 4.");
            }
        }
    }
}
