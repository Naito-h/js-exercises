import * as fs from 'node:fs';
import { promisify } from 'util';

// Promise コンストラクタで変換した readdir
export function promiseReaddir(path: string, options: any): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(path, options, (err: any, files: string[]) => {
            if (err) {
                reject(err);
            }
            resolve(files);
        });
    });
}

promiseReaddir('./ch13/ex03', {}).then((files) => {
    console.log(files);
}).catch((err) => {
    console.error(err);
});

// Promise コンストラクタで変換した stat
export function promiseStat(path: string, options: any): Promise<fs.Stats> {
    return new Promise((resolve, reject) => {
        fs.stat(path, options, (err: any, stats: fs.Stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats);
        });
    });
}

promiseStat('./ch13/ex03/index.ts', {}).then((stats) => {
    console.log(stats);
}).catch((err) => {
    console.error(err);
});

// promisify 関数で変換した readdir
export const promisifiedReaddir = promisify(fs.readdir);
promisifiedReaddir('./ch13/ex03', {}).then((files) => {
    console.log(files);
}).catch((err) => {
    console.error(err);
});

// promisify 関数で変換した stat
export const promisifiedStat = promisify(fs.stat);
promisifiedStat('./ch13/ex03/index.ts', {}).then((stats) => {
    console.log(stats);
}).catch((err) => {
    console.error(err);
});
