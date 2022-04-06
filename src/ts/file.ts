import {open as fsopen} from 'fs/promises';
import {type FileHandle} from 'fs/promises';

enum MODE {
    READ,
    WRITE,
    READPLUS,
    WRITEPLUS,
    APPEND,
    APPENDPLUS,
}

class File {
    #fd: FileHandle | Promise<FileHandle>;
    mode: MODE;
    //Constructors
    constructor(path: str, mode: str) {
        this.#fd = fsopen(path, mode);
        let flags: MODE;
        switch(mode){
            case 'r': flags = MODE.READ; break;
            case 'wx':
            case 'w': flags = MODE.WRITE; break;
            case 'ax':
            case 'a': flags = MODE.APPEND; break;
            case 'r+': flags = MODE.READPLUS; break;
            case 'w+': flags = MODE.WRITEPLUS; break;
            case 'a+': flags = MODE.APPENDPLUS; break;
        }
        this.mode = flags;
    }

    //Static Functions
    static async open(path: str, mode:str): Promise<File> {
        return new this(path, mode);
    }
    
    //Instance Methods
    async read(): Promise<str> {
        this.#fd = await this.#fd;
        if(this.mode != MODE.APPEND && this.mode != MODE.WRITE){
            let buf: Buffer = await this.#fd.readFile();
            return buf.toString();
        } else {
            throw Error(`Can't read from file in append/write mode.`);
        }
    }
    async write(data : string | Buffer): Promise<bool> {
        this.#fd = await this.#fd;
        if(this.mode != MODE.READ){
            await this.#fd.writeFile(data);
        } else {
            throw Error(`Can't write to file when readonly.`);
        }
        return true;
    }
    async close(): Promise<bool> {
        this.#fd = await this.#fd;
        await this.#fd.close();
        return true;
    }
}

export default File;
export {File};