import * as rsa from './rsa';
import * as hash from './hash';
import {input} from './user';

async function main(): void{
    while (true){
        console.log("Welcome to RSA-ex in TS!");
        console.log("This is an example of the RSA encryption method that is used today in the Internet to encrypt data.")
        console.log("What do you want to do?")
        console.log("Generate public/private keys (g)");
        console.log("Encrypt a message (e)");
        console.log("Decrypt a message (d)");
        try {
            let choice = await input(">");
        } catch(e){
            
        };
    }
}

main();