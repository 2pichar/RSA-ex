import * as readline from 'readline';
import {Duplex} from 'stream';
import './types' // Import types

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.prompt(true);
async function input(prompt: str): Promise<str> {
  return new Promise((resolve, reject) => {
    try{
      rl.question(prompt, (answer)=>{
        resolve(answer);
      })
    } catch(e){
      reject(e);
    }
  });
}
function onInput(callback): void{
  rl.on('line', callback);
}

export {onInput, input};