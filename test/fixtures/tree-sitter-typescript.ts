export interface Person {
  age: number;
  name: string;
}

export class Greeter<T extends Person> {
  constructor(private readonly person: T) {}

  greet(): string {
    return `Hello, ${this.person.name}!`;
  }
}

const greeter = new Greeter<Person>({ age: 1, name: "world" });
console.log(greeter.greet());
