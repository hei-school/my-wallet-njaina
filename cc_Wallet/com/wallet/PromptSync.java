package com.wallet;
import java.util.Scanner;

public class PromptSync {
    public static String promptSync(String question) {
        System.out.print(question);
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }
}
