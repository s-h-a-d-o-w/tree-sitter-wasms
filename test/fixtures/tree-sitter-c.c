#include <stdio.h>

typedef struct {
  const char *name;
} Greeter;

static int add(int a, int b) { return a + b; }

int main(void) {
  Greeter greeter = {.name = "world"};
  printf("Hello, %s! %d\n", greeter.name, add(1, 2));
  return 0;
}
