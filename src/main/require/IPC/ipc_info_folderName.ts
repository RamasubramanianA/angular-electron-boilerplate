import { BrowserWindow, dialog } from 'electron';
import * as os from 'os';
import { DtoSystemInfo } from '../../../common/interface/dtosysteminfo';


export function request_systeminfo( win: BrowserWindow ) {
    const systemInfo = new DtoSystemInfo();
    systemInfo.Arch = os.arch(); 
    systemInfo.Hostname = os.hostname();
    systemInfo.Platform = os.platform();
    systemInfo.Release = os.release();
    const serializedString = systemInfo.serialize();
    if (win) {
        win.webContents.send('systeminfo', serializedString);
    }
}

export function request_folderName(win){
    let folderName: string;
    dialog.showOpenDialog({ properties: ['openDirectory'] })
        .then(val => {
            folderName = val.filePaths[0];
            console.log('folderName: ', folderName);
            if (win) {
                win.webContents.send('folderName', folderName);
            }
        });
}