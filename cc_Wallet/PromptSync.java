import java.util.Scanner;

public class PromptSync {
    public static String promptSync(String question) {
        System.out.print(question);
        try (Scanner scanner = new Scanner(System.in)) {
            return scanner.nextLine().trim();
        }
    }
}
