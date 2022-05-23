import { readFile as readFilePromise, writeFile as writeFilePromise } from 'fs/promises';
import http from 'http';

// import { readFile } from 'fs';
// import util from 'util';
// const reamdPromise = util.promisify(readFile);


// console.log('stated');
// the code will be ivoced async and don't block event loop
// (async () => {
//   const txtFile = await readFile('test.txt', {encoding: 'utf-8'});
//   let alltext = '';
//   for (let text of txtFile) {
//     alltext += text;
//   }
//   console.log(alltext); 
//   console.log('completed first task');
// })();
// console.log('starting next task');

// the code will be ivoced async but will be block event loop
// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     res.write('Home page')
//     res.end();
//   }
//   if (req.url === '/about') {
//     // BLOCKING CODE and we don't use the method, so how solve it? the down we solve it
//     for (let i = 0; i < 1000; i++) {
//       for (let j = 0; j < 1000; j++) {
//         console.log(`${i}, ${j}`);
//       }
//     }
//     res.write('About page');
//     res.end();
//   }

//   res.write('Error page');
//   res.end();
// });

// server.listen(3000, () => {
//   console.log('Server listentening on the port 3000');
// })

// Solve how don't BLOCKING the EVENT LOOP 
// const getText = (textPath) => {
//   return new Promise((resolve, reject) => {
//     readFile(textPath, 'utf-8', (err, result) => {
//       if (err) reject(err);
//       else resolve(result)
//     })
//   })
// }

// first solution
// getText('./test.txt')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

// second solution
// const start = async () => {
//   try {
//     const first = await getText('./test.txt');
//     console.log(first);
//   } catch (error) {
//     return console.log(error);
//   }
// }
// start();

// third solution use util module and method promisify
// const start = async () => {
//   try {
//     const first = await reamdPromise('./test.txt', 'utf-8');
//     console.log(first);
//   } catch (error) {
//     return console.log(error);
//   }
// }
// start();

// fourth solution and the best is import promises readFile imidiatly
const start = async () => {
  try {
    const first = await readFilePromise('./test.txt', { encoding: 'utf-8' });
    await writeFilePromise('newText.txt', `Here is text from test.txt file: ${first}`);
    console.log(first);
  } catch (error) {
    return console.log(error);
  }
}
start();