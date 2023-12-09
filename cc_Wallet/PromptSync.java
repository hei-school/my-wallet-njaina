import java.util.Scanner;

public class PromptSync {
    public static String promptSync(String question) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print(question);
            return scanner.nextLine();
        }
    }
}
