import java.util.List;

public class WalletFunc {
    public static WalletItem addPITToWallet(List<WalletItem> items, String pitType) {
        WalletItem walletItem = new WalletItem("pit", pitType, 0);
        items.add(walletItem);
        return walletItem;
    }

    public static WalletItem addMoneyToWallet(List<WalletItem> items, double amount) {
        WalletItem walletItem = new WalletItem("money", null, amount);
        items.add(walletItem);
        return walletItem;
    }

    public static double viewMoneyInWallet(List<WalletItem> items) {
        double totalMoney = 0;
        for (WalletItem item : items) {
            if ("money".equals(item.getType())) {
                totalMoney += item.getAmount();
            }
        }
        return totalMoney;
    }

    public static WalletItem withdrawMoneyFromWallet(List<WalletItem> items, double amount) {
        double totalMoney = viewMoneyInWallet(items);

        if (amount > 0 && amount <= totalMoney) {
            WalletItem walletItem = new WalletItem("money", null, -amount);
            items.add(walletItem);
            return walletItem;
        } else {
            return null;
        }
    }
}
