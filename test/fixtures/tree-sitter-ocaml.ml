type person = { name : string; age : int }

let greet person = Printf.sprintf "Hello, %s!" person.name

let () =
  let people = [ { name = "world"; age = 1 } ] in
  List.iter (fun p -> print_endline (greet p)) people
