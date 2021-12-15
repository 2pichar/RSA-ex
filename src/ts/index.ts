import * as rsa from './rsa.js';
import * as hash from './hash.js';
import {input} from './user.js';

async function main(): Promise<void>{
    console.log("Welcome to RSA-ex in TS!");
    console.log("This is an example of the RSA encryption method that is used today in the Internet to encrypt data.\n")
    var keys: RSAKeys = rsa.NULL;
    mainloop:
    while (true){
        console.log("What do you want to do?\n")
        console.log("Generate public/private keys (g)");
        console.log("Encrypt a message (e)");
        console.log("Decrypt a message (d)");
        console.log("Quit (q)");
        try {
            let choice = await input(">");
            inputSwitch:
            switch (choice){
                case "g":
                    keys = await rsa.generateKeys(100);
                    console.log("Keys generated");
                    break inputSwitch;
                case "e":
                    if(!keys.public.e){
                        console.log("You need to generate the public/private keys first!");
                        continue mainloop;
                    } else {
                        let message = await input("Enter the message to encrypt: ");
                        let hashed = hash.encode(message);
                        let encrypted = hash.hex(rsa.encrypt(hash.decimal(hashed), keys.public.n, keys.public.e));
                        console.log("Encrypted message: " + encrypted);
                    }
                    break inputSwitch;
                case "d":
                    if(!keys.private.d){
                        console.log("You need to generate the public/private keys first!");
                        continue mainloop;
                    } else {
                        let message = await input("Enter the message to decrypt: ");
                        let hashed = hash.hex(rsa.decrypt(hash.decimal(message), keys.private.n, keys.private.d));
                        let decrypted = hash.decode(hashed);
                        console.log("Decrypted message: " + decrypted);
                    }
                    break inputSwitch;
                case "q":
                    console.log("Exiting...");
                    break mainloop;
                default:
                    console.log("Invalid input!");
                    break inputSwitch;
            }
        } catch(e){
            console.log("An error occured: " + e);
            process.exit(1);
        };
    }
    process.exit(0);
}

main();