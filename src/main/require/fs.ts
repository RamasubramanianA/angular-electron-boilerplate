import { promises, resolve } from "dns";

//requiring path and fs modules
const path = require('path');
const fs = require('fs');

export function findFile(dir, needDir) {
    const Filesystem = require('fs');
    var findingList = [];
    Filesystem.readdirSync(dir).forEach(function (file) {
        var stat;
        stat = Filesystem.statSync("" + dir + "/" + file);
        //console.log(file ,stat);
        if (needDir) {
            if (stat.isDirectory()) {
                console.log("directory :",file);
                findingList.push(file);
            }
        }
        else {
            if (!stat.isDirectory()) {
                var buff = file.split('.');
                console.log("file :",file)
                findingList.push(buff[0]);
            }
        }
    });
    return findingList;
};

export function getFileListInDir() : Promise<string[]>{
    return new Promise(resolve => {
        //joining path of directory 
        const directoryPath ='F:\\ELECTRON\\YenBook\\courses';
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


export function fileContent(Filename: string): Promise<string>{
    console.log('Filename on path: ', Filename);
    let path = 'F:\\ELECTRON\\YenBook\\courses\\' + Filename;
    return new Promise(resolve  =>{
            fs.readFile(path,  function (err, data) {
                if (err) throw err;
            console.log("fileContent function. ",data.toString());
            resolve(data.toString());
        });

    });

}
