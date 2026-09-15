import Foundation

struct Greeter {
    let name: String

    func greet() -> String {
        return "Hello, \(name)!"
    }
}

let greeters = ["world", "swift"].map { Greeter(name: $0) }
for greeter in greeters {
    print(greeter.greet())
}
