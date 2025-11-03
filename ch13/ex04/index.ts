import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export function fetchFirstFileSize(path: string): Promise<number | null> {
    return fsPromises.readdir(path)
        .then((files) => {
            if (files.length === 0) {
                return null;
            }
            return fsPromises.stat(`${path}/${files[0]}`);
        }).then((stats) => {
            return stats ? stats.size : null;
        }).catch((err) => {
            throw err;
        });
}

// fetchFirstFileSize('./ch13/ex04')
//     .then(size => console.log(size))
//     .catch(err => console.error(err));

export function fetchSumOfFileSizes(path: string): Promise<number> {
    return fsPromises.readdir(path)
        .then((files) => {
            const promises = files.map((file) => 
                fsPromises.stat(join(path, file))
            );
            return Promise.all(promises);
        })
        .then((stats) => {
            return stats.reduce((sum, stat) => sum + stat.size, 0);
        })
        .catch((err) => {
            throw err;
        });
}

// fetchSumOfFileSizes('./ch13/ex04')
//     .then((totalSize) => console.log(totalSize))
//     .catch((err) => console.error(err));