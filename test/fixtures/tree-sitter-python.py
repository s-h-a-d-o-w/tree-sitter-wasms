from dataclasses import dataclass


@dataclass
class Greeter:
    name: str

    def greet(self) -> str:
        return f"Hello, {self.name}!"


if __name__ == "__main__":
    for greeter in (Greeter(name) for name in ["world", "python"]):
        print(greeter.greet())
