import * as promises from 'fs/promises';
import type FileHandle from 'fs/promises';

async function open(path: str): Promise<FileHandle> {
    return await promises.open(path, 'r+');
}

export {open};