//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');

// With async/await:
export function isFileExist(f): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        await fsExtra.pathExists(f, (err, exists) => {
            if (err) {
                console.log('isFileExist err: ', err);
                reject(err);
            }
            // reject('hi rejected.');
            console.log(exists) // => false
            console.log('isFileExist: ', exists);
            resolve(exists);
        });
    });
}


export function getFileAndFolderArray(dir: string,
    needFolderOnly: boolean, needFileOnly: boolean, wantBoth: boolean): string[] {
        // const Filesystem = require('fs');
        console.log('dir: ', dir);
    const Filesystem = fs;
    var list: string[] = [];
    Filesystem.readdirSync(dir).forEach(function (file) {
        var stat;
        stat = Filesystem.statSync("" + dir + "/" + file);
        //console.log(file ,stat);
        if (stat.isDirectory()) {
            console.log("directory :", file);
            if (needFolderOnly || wantBoth) {
                list.push(file);
            }
        }
        else {
            var buff = file.split('.');
            console.log("file :", file);
            if (needFileOnly || wantBoth)
                list.push(buff[0]);
        }

    });
    return list;
};

export function getFileListInDir(baseDirectory: string): Promise<string[]> {
    return new Promise(resolve => {
        //joining path of directory 
        const directoryPath = baseDirectory;
        console.log('directoryPath in getFileListInDir: ', directoryPath);
        //'F:\\ELECTRON\\YenBook\\courses'


        //passsing directoryPath and callback function
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            // files.forEach(function (file) {
            //     // Do whatever you want to do with the file
            //     console.log(file); 
            //     files.push(file);
            // });
            console.log('files: ', files);
            resolve(files);
        });
    });
}


export function fileContent(Filename: string): Promise<string> {
    console.log('Filename on path: ', Filename);
    let path = 'F:\\ELECTRON\\YenBook\\courses\\' + Filename;
    return new Promise(resolve => {
        fs.readFile(path, function (err, data) {
            if (err) throw err;
            console.log("fileContent function. ", data.toString());
            resolve(data.toString());
        });

    });

}
