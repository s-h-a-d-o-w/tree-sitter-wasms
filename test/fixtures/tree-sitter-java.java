package demo;

import java.util.List;

public class Greeter {
    private final String name;

    public Greeter(String name) {
        this.name = name;
    }

    public String greet() {
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) {
        List.of("world", "java").forEach(n -> System.out.println(new Greeter(n).greet()));
    }
}
