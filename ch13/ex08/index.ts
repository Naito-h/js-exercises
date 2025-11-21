import * as fs from 'node:fs/promises';

export async function fetchFirstFileSize(path: string): Promise<number> {
    const files = await fs.readdir(path);
    if (files.length === 0) {
        return 0;
    }
    const stats = await fs.stat(`${path}/${files[0]}`);
    return stats.size;
}

// fetchFirstFileSize("ch13/ex08")
//     .then(size => console.log(size))
//     .catch(err => console.error(err));

export async function fetchSumOfFileSizes(path: string): Promise<number> {
    let total = 0;
    const files = await fs.readdir(path);
    for (const file of files) {
        const stats = await fs.stat(`${path}/${file}`);
        total += stats.size;
    }
    return total;
}

// fetchSumOfFileSizes("ch13/ex08")
//     .then(size => console.log(size))
//     .catch(err => console.error(err));