const fsExtra = require('fs-extra');

// With async/await:
export async function isFileExist (f): Promise<void> {
    const exists = await fsExtra.pathExists(f,(err, exists) => {
        console.log(err) // => null
        console.log(exists) // => false
        console.log('isFileExist: ', exists);
        return exists;
      });
  }


