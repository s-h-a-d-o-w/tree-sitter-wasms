export class Greeter {
  #name;

  constructor(name) {
    this.#name = name;
  }

  greet() {
    return `Hello, ${this.#name}!`;
  }
}

const greeters = ["world", "js"].map((name) => new Greeter(name));
for (const greeter of greeters) {
  console.log(greeter.greet());
}
