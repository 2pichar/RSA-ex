import * as promises from 'fs/promises';
import type FileHandle from 'fs/promises';

enum MODE {
    READ,
    WRITE,
    READPLUS,
    WRITEPLUS,
    APPEND,
    APPENDPLUS,
}

class File {
    #fd: FileHandle;
    mode: MODE;
    //Constructors
    async constructor(path: str, mode: str): Promise<File> {
        this.#fd = await promises.open(path, mode);
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
        return await new this.constructor(path, mode);
    }
    
    //Instance Methods
    async read(): Promise<str> {
        if(this.mode != MODE.APPEND || this.mode != MODE.WRITE){
            let buf: Buffer;
            ({buffer: buf} = await this.#fd.readFile('utf8'));
        } else {
            throw Error(`Can't read from file in append/write mode.`);
        }
    }
    async write(data : string | buffer): Promise<bool> {
        if(this.mode != MODE.READ){
            await this.#fd.writeFile(data);
        } else {
            throw Error(`Can't write to file when readonly.`);
        }
        return true;
    }
    async close(): Promise<bool> {
        await this.#fd.close();
        return true;
    }
}

export default File;
export {File};