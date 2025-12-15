const figlet = require("figlet");
const chalk = require("chalk");

async function doStuff() {
  // Added { font: 'ANSI Shadow' } here
  figlet.text("EVOLVEAI", { font: 'ANSI Shadow' }, function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          return;
      }
      console.log(chalk.blueBright(data)); 
  });
}

doStuff();