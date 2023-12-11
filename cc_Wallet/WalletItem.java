public class WalletItem {
    private String type;
    private String pitType;
    private double amount;

    public WalletItem(String type, String pitType, double amount) {
        this.type = type;
        this.pitType = pitType;
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPitType() {
        return pitType;
    }

    public void setPitType(String pitType) {
        this.pitType = pitType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
