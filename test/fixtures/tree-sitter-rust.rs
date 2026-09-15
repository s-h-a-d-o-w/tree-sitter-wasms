use std::fmt;

struct Greeter {
    name: String,
}

impl fmt::Display for Greeter {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Hello, {}!", self.name)
    }
}

fn main() {
    for name in ["world", "rust"] {
        let greeter = Greeter { name: name.to_string() };
        println!("{greeter}");
    }
}
