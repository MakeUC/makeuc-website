const fs = require("fs");
const dest = ".devcontainer/.env.local";
if (!fs.existsSync(dest)) {
  fs.copyFileSync(".devcontainer/.env.local.default", dest);
  console.log("Copied default environment file.");
} else {
  console.log("A local environment file already exists.");
}
