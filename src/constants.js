export const LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
];

export const SNIPPETS = {
  javascript: `// Write you code here
console.log("Hello, world!");`,
  python: `# Write you code here
print("Hello, world!")`,
  java: `// Write you code here
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`,
  cpp: `// Write you code here
#include <iostream>

int main() {
    std::cout << "Hello, world!" << std::endl;
    return 0;
}`,
};

export const PISTON_EXECUTE = "https://emkc.org/api/v2/piston/execute";