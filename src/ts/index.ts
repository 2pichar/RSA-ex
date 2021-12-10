import * as rsa from './rsa';
import * as hash from './hash';
import {input} from './user';
import './types';

async function main(): Promise<void>{
    console.log("Welcome to RSA-ex in TS!");
    console.log("This is an example of the RSA encryption method that is used today in the Internet to encrypt data.\n")
    var keys: RSAKeys = rsa.NULLKEYS;
    mainloop:
    while (true){
        console.log("What do you want to do?\n")
        console.log("Generate public/private keys (g)");
        console.log("Encrypt a message (e)");
        console.log("Decrypt a message (d)");
        console.log("Quit (q)");
        try {
            let choice = await input(">");
            switch (choice){
                case "g":
                    keys = await rsa.generateKeys(10);
                    break;
                case "e":
                    if(!keys.public.e){
                        console.log("You need to generate the public/private keys first!");
                        continue mainloop;
                    } else {
                        let message = await input("Enter the message to encrypt: ");
                        let hashed = await hash.hash(message);
                        console.log(hashed);
                        let encrypted = (await rsa.encrypt(hash.number(hashed), keys.public.n, keys.public.e)).toString(16);
                        console.log("Encrypted message: " + encrypted);
                    }
                    break;
                case "d":
                    if(!keys.private.d){
                        console.log("You need to generate the public/private keys first!");
                        continue mainloop;
                    } else {
                        let message = await input("Enter the message to decrypt: ");
                        let hashed = (await rsa.decrypt(hash.number(message), keys.public.n, keys.private.d)).toString(16);
                        console.log("Hashed decrypted message: " + hashed);
                        let decrypted = await hash.unhash(hashed);
                        console.log("Decrypted message: " + decrypted);
                    }
                    break;
                case "q":
                    console.log("Exiting...");
                    break mainloop;
                default:
                    console.log("Invalid input!");
                    break;
            }
        } catch(e){
            console.log("An error occured: " + e);
            process.exit(1);
        };
    }
    process.exit(0);
}

main();