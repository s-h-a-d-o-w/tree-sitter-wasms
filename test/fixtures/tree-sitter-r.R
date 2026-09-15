greet <- function(name) {
  paste0("Hello, ", name, "!")
}

names <- c("world", "R")
for (name in names) {
  print(greet(name))
}
