class Greeter {
  final String name;

  const Greeter(this.name);

  String greet() => 'Hello, $name!';
}

void main() {
  final greeters = <Greeter>[const Greeter('world')];
  for (final greeter in greeters) {
    print(greeter.greet());
  }
}
