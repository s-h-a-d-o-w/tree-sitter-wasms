package demo

data class Greeter(val name: String) {
    fun greet(): String = "Hello, $name!"
}

fun main() {
    listOf("world", "kotlin")
        .map { Greeter(it) }
        .forEach { println(it.greet()) }
}
