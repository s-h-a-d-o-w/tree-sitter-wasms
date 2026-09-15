using System;
using System.Collections.Generic;

namespace Demo
{
    public class Greeter
    {
        public string Name { get; set; } = "world";

        public string Greet() => $"Hello, {Name}!";

        public static void Main(string[] args)
        {
            var greeters = new List<Greeter> { new Greeter() };
            greeters.ForEach(g => Console.WriteLine(g.Greet()));
        }
    }
}
