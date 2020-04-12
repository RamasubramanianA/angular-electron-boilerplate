const fs = require('fs');

/*Make directory function. */
function mkD(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        return true;
    }
    else return false;
}

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
