const fs = require("fs");

if (process.argv.length < 3) {
  console.log("need file path");
  process.exit(1);
}
if (process.argv.length > 3) {
  console.log("too may arguments");
  process.exit(1);
}

const path = "src/posts/" + process.argv[2];
const date = new Date().toISOString();
var output_str = "";

output_str += "---\n";
output_str += "title: \n";
output_str += "date: " + date + "\n";
output_str += "image: http://example.com\n";
output_str += "draft: false\n";
output_str += "tags:\n";
output_str += "  - tag\n";
output_str += "categories:\n";
output_str += "  - Category\n";
output_str += "---\n";
output_str += "\n";
output_str += "<!--more-->\n";
output_str += "\n";
output_str += "## Reference\n";
output_str += "\n";
output_str += "- [Link](https://example.com)\n";

fs.writeFileSync(path, output_str);
console.log("create new post: " + "./" + process.argv[2]);
