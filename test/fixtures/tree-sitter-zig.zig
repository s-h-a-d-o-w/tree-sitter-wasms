const std = @import("std");

const Greeter = struct {
    name: []const u8,

    pub fn greet(self: Greeter, writer: anytype) !void {
        try writer.print("Hello, {s}!\n", .{self.name});
    }
};

pub fn main() !void {
    const greeter = Greeter{ .name = "world" };
    try greeter.greet(std.io.getStdOut().writer());
}
