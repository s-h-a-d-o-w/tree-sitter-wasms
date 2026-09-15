#include <string>
#include <vector>

namespace demo {

template <typename T>
class Box {
 public:
  explicit Box(T value) : value_(std::move(value)) {}

  const T& get() const { return value_; }

 private:
  T value_;
};

}  // namespace demo

int main() {
  demo::Box<std::string> box("hello");
  std::vector<int> numbers{1, 2, 3};
  return static_cast<int>(numbers.size() + box.get().size());
}
