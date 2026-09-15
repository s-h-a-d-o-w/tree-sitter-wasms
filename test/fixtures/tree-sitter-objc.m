#import <Foundation/Foundation.h>

@interface Greeter : NSObject

@property(nonatomic, copy) NSString *name;

- (NSString *)greet;

@end

@implementation Greeter

- (NSString *)greet {
  return [NSString stringWithFormat:@"Hello, %@!", self.name];
}

@end

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    Greeter *greeter = [[Greeter alloc] init];
    greeter.name = @"world";
    NSLog(@"%@", [greeter greet]);
  }
  return 0;
}
