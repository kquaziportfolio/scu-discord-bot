const chalk = require("chalk");
module.exports = {
  error: function (prefix, message) {
    console.log(chalk.red(`[${prefix}] `) + chalk.red.bold(message));
  },
};