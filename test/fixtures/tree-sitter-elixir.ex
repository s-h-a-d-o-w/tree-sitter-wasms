defmodule Greeter do
  @moduledoc "Greets people."

  defstruct name: "world"

  def greet(%__MODULE__{name: name}) when is_binary(name) do
    "Hello, #{name}!"
  end
end

["world", "elixir"]
|> Enum.map(&%Greeter{name: &1})
|> Enum.each(fn greeter -> IO.puts(Greeter.greet(greeter)) end)
