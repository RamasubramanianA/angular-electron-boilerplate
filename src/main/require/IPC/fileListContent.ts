import { getFileListInDir, fileContent, isFileExist, getFileAndFolderArray } from '../fs';

export async function request_file_list(win){
    console.log('request-file-list in main.');

    if (win) {
        let files = await getFileListInDir('');
        console.log('files await: ', files);
        win.webContents.send('files-in-dir', files);
    }
    else
        console.log('win not available. ');


}

export async function  request_file_content( v, fileName: string , win){
    console.log('request-file-content in main -->.', fileName);

        if (win) {
            let content: string = await fileContent(fileName);
            console.log('files after await : ', content);
            win.webContents.send('file-content', content);
        }
        else
            console.log('win not available. ');
}