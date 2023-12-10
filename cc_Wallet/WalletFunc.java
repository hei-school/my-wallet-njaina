import java.util.ArrayList;
import java.util.List;

public class WalletFunc {

    public static class Result {
        boolean success;
        String[] messages;
        double newBalance;

        public Result(boolean success, String[] messages, double newBalance) {
            this.success = success;
            this.messages = messages;
            this.newBalance = newBalance;
        }
    }

    public Result addMoney(double amount, double currentBalance) {
        double newBalance = currentBalance + amount;
        return new Result(true, new String[]{"Money added successfully!", "Current balance: $" + newBalance}, newBalance);
    }

    public Result viewMoney(double currentBalance) {
        return new Result(true, new String[]{"Current balance: $" + currentBalance}, currentBalance);
    }

    public Result withdrawMoney(double amount, double currentBalance) {
        if (currentBalance >= amount && amount >= 0) {
            double newBalance = currentBalance - amount;
            return new Result(true, new String[]{"Money withdrawn successfully!", "Current balance: $" + newBalance}, newBalance);
        } else {
            return new Result(false, new String[]{"Invalid withdrawal amount. Cannot withdraw more than the current balance."}, currentBalance);
        }
    }

    public Result viewMoneyInWallet(List<Item> items) {
        List<String> messages = new ArrayList<>();

        // Calculate the current balance
        double currentBalance = calculateBalance(items);

        messages.add("Current balance: $" + currentBalance);

        return new Result(true, messages.toArray(new String[0]), currentBalance);
    }

    private double calculateBalance(List<Item> items) {
        double balance = 0;
        for (Item item : items) {
            if (item.getType().equals("money")) {
                balance += item.getAmount();
            }
        }
        return balance;
    }
}
