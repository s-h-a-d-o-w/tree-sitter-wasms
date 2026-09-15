# frozen_string_literal: true

class Greeter
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def greet
    "Hello, #{name}!"
  end
end

%w[world ruby].each { |n| puts Greeter.new(n).greet }
