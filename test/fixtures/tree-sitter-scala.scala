package demo

final case class Greeter(name: String) {
  def greet: String = s"Hello, $name!"
}

object Main {
  def main(args: Array[String]): Unit =
    List("world", "scala").map(Greeter.apply).foreach(g => println(g.greet))
}
