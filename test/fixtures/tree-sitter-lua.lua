local Greeter = {}
Greeter.__index = Greeter

function Greeter.new(name)
  return setmetatable({ name = name }, Greeter)
end

function Greeter:greet()
  return string.format("Hello, %s!", self.name)
end

for _, name in ipairs({ "world", "lua" }) do
  print(Greeter.new(name):greet())
end
