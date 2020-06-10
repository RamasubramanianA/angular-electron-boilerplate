import { BrowserWindow, dialog } from 'electron';


export function request_systeminfo( win: BrowserWindow , os) {
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

export class DtoSystemInfo {
    public Arch: string;
    public Hostname: string;
    public Platform: string;
    public Release: string;

    public static deserialize(jsonString: string): DtoSystemInfo {
        const dto: DtoSystemInfo = JSON.parse(jsonString);
        return dto;
    }

    public serialize(): string {
        return JSON.stringify(this);
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