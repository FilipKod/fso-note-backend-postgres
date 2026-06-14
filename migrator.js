const { umzug } = require("./util/db")

if (require.main === module) {
  umzug.runAsCLI()
}