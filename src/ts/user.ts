import * as readline from 'readline';
import {Duplex} from 'stream';
import 'types' // Import types

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

class UI extends Duplex {
    private _src: readline.Interface;
    constructor(input, output) {
        super({encoding: 'utf-8'});
        this._src = readline.createInterface({input, output});
        this._src.on('line', (data) => {
          this.push(data);
          this.emit('input');
        });
    };
    _read(size){
        this._src.prompt();
    }
    _write(data, encoding, callback){
        this._src.write(data);
    }
}

export default UI;
export {onInput, input, UI};