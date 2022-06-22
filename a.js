const fs = require("fs/promises");
const path = require("path");

class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.name = name;
        this.filename = filename;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    static async getFile(filename) {
        const stat = await fs.stat(filename);
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = new Date(stat.birthtime);
        const updateTime = new Date(stat.mtime)
        return new File(filename, name, ext, isFile, size, createTime, updateTime)
    }

    async getContents(isBuffer = false) {
        if (this.isFile) {
            if (isBuffer) {
                return await fs.readFile(this.filename);
            } else {
                return await fs.readFile(this.filename, 'utf-8')
            }
        }
    }

    async getChildren() {
        if (this.isFile) {
            return [];
        } else {
            let children = await fs.readdir(this.filename);
            children = children.map(name => {
                const result = path.join(this.filename, name)
                return File.getFile(result)
            })
            return Promise.all(children)
        }
    }
}

async function test() {
    const filename = path.resolve(__dirname, './myfiles')
    const file = await File.getFile(filename);
    console.log(file)
    console.log(await file.getContents(true))
    console.log(await file.getChildren())
    return file;
}
test()
