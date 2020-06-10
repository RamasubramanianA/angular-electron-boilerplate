import { getFileListInDir, fileContent, isFileExist, getFileAndFolderArray } from './fs';
import { DtoSystemInfo } from './../../ipc-dtos/dtosysteminfo';
import * as os from 'os';
import { dialog, BrowserWindow, ipcMain } from 'electron';
import { CourseAvailability } from "../../common/interface/courseAvailability";
import * as path from 'path';
import { promises, resolve } from 'dns';


export function ipc(win: BrowserWindow) {
    console.log('#################### IPC');
    console.log('win: ', win);
    win.webContents.toggleDevTools();

    ipcMain.on('dev-tools', () => {
        if (win) {
            win.webContents.toggleDevTools();
        }
    });

    ipcMain.on('request-systeminfo', () => {
        const systemInfo = new DtoSystemInfo();
        systemInfo.Arch = os.arch();
        systemInfo.Hostname = os.hostname();
        systemInfo.Platform = os.platform();
        systemInfo.Release = os.release();
        const serializedString = systemInfo.serialize();
        if (win) {
            win.webContents.send('systeminfo', serializedString);
        }
    });

    ipcMain.on('request-folderName', () => {
        let folderName: string;
        dialog.showOpenDialog({ properties: ['openDirectory'] })
            .then(val => {
                folderName = val.filePaths[0];
                console.log('folderName: ', folderName);
                if (win) {
                    win.webContents.send('folderName', folderName);
                }
            });
    });




    ipcMain.on('request-file-list', async () => {
        console.log('request-file-list in main.');

        if (win) {
            let files = await getFileListInDir('');
            console.log('files await: ', files);
            win.webContents.send('files-in-dir', files);
        }
        else
            console.log('win not available. ');


    });


    ipcMain.on('request-file-content', async (v, fileName: string) => {
        console.log('request-file-content in main -->.', fileName);

        if (win) {
            let content: string = await fileContent(fileName);
            console.log('files after await : ', content);
            win.webContents.send('file-content', content);
        }
        else
            console.log('win not available. ');
    });


    ipcMain.on('getTestForTheMinimumCourseAvailable', async (event, baseDirectory: string) => {
        console.log('getTestForTheMinimumCourseAvailable -->.', baseDirectory[0]);

        if (win) {
            let courseAvailability: CourseAvailability;
            let folders: string[] = await getFileAndFolderArray(baseDirectory[0].replace('\\', '\\\\'), true, false, false);
            if (folders.length === 0) {
                courseAvailability = {
                    alertRequired: true,
                    demoCousesOnly: false,
                    message: 'Your local library is empty.'
                }
                win.webContents.send('courseAvailablity', courseAvailability);
                return;
            } else {
                availabilityPromis(folders, baseDirectory).then((avail: CourseAvailability) => {
                    win.webContents.send('courseAvailablity', avail);
                    return;
                }).catch(() => {
                    console.log("Undefined.");
                    win.webContents.send('courseAvailablity', courseAvailability);
                });
            }
        }
        else
            console.log('win not available from CourseAvailability. ');
    });


}


function availabilityPromis(folders: string[], baseDirectory): Promise<CourseAvailability> {
    let demoFolderFound: boolean = false;
    let invalidFolderFound: boolean = false;
    let valid: boolean = false;
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < folders.length; i++) {
            let file = folders[i];
            //  folders.forEach((file) => {
            if (file.substring(0, 4) == 'demo') {
                console.log('demo: ');
                demoFolderFound = true;
            } else {
                let fileCheck = path.join(baseDirectory[0].replace('\\', '\\\\'), file, 'courseDetails.json');
                await isFileExist(fileCheck).then(exist => {
                    console.log(fileCheck, exist);
                    if (exist) {
                        valid = true;
                        resolve({
                            alertRequired: false,
                            demoCousesOnly: false,
                            message: 'Course available.'
                        });
                        console.log('Resolved and returning. ');
                        return;
                    } else {
                        invalidFolderFound = true;
                    }
                });

                if (valid) {
                    console.log('valid: ', valid);
                    return;
                }

                // console.log("continueing..");

                // if (i >= (folders.length - 1)) {
                    
                // } else {
                //     console.log("Not the last itration.");
                // }
            }


            // });
        }

        if (demoFolderFound && invalidFolderFound && !valid) {
            console.log('demoFolderFound && invalidFolderFound: ', demoFolderFound && invalidFolderFound);
            resolve({
                alertRequired: true,
                demoCousesOnly: false,
                message: 'Demo course and some folders available but no valid course found.'
            });
        }
        else if (demoFolderFound && !valid) {
            console.log('demoFolderFound: ', demoFolderFound);
            resolve({
                alertRequired: true,
                demoCousesOnly: true,
                message: 'Demo course only available. Please download some courses.'
            });
        }
        else if (invalidFolderFound && !valid) {
            console.log('invalidFolderFound: ', invalidFolderFound);
            resolve({
                alertRequired: true,
                demoCousesOnly: false,
                message: 'Some folders available but that is not a valid course.'
            })

        }
    });

}