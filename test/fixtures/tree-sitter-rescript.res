type person = {name: string, age: int}

let greet = (p: person) => "Hello, " ++ p.name ++ "!"

let main = () => {
  let p = {name: "world", age: 1}
  Js.log(greet(p))
}
