// Every export return wrapping of IIFE function with arguments export, require, module, __file, __dirname
// wraping IIFE

// (function(exports, require, module, __filename, __dirname) {
    // console.log(arguments)
    // return ...
// })()

// if the module isn't promises we can turn it to promises with module util
import utils from 'util';
import {exec} from 'child_process';

const execProm = utils.promisify(exec);

// (async () => {
//   const { stdout, stderr } = await execProm('ls /');

//   console.log(stdout);
// })().catch(err => { if (err) throw err });

// (async () => {
//   try {
//     const { stdout, stderr } = await execProm('ls /');
//     console.log(stdout);
//   } catch (error) {
//     throw error; // or process.exit(1);
//   }
// })()

// if we want make node application for production should use pm2 module - learn about it!!! 

// for debugging the code we can call in terminal: 
// node--inspect - brk index.js // brk for don't exit the node after the end the code
// after that we can open chrome://inspect - than we can click on inspect and make debugging

// for install node moduel specific version 
// npm i package@version

// ~ install last Patch version which will be work with the older version
// ^ install last Minor and Patch version wich will be work with the older version

// npm - give us the passibility ways
// 1. reuse our code
// 2. use other developers module codes
// 3. share our app code to other