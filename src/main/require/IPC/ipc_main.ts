import { isFileExist, getFileAndFolderArray } from '../fsRelated';
import { BrowserWindow, ipcMain } from 'electron';
// import { CourseAvailability } from "../../../common/interface/courseAvailability";
import { request_systeminfo, request_folderName } from './ipc_info_folderName';
import { request_file_list, request_file_content } from './fileListContent';
import { getTestForTheMinimumCourseAvailable } from "./CourseAvailable";
export function ipc(win: BrowserWindow ) {

    win.webContents.toggleDevTools();

    ipcMain.on('dev-tools', () => {
        if (win) {
            win.webContents.toggleDevTools();
        }
    });

    ipcMain.on('request-systeminfo', () => { request_systeminfo(win) });
    ipcMain.on('request-folderName', () => { request_folderName(win) });
    ipcMain.on('request-file-list', () => { request_file_list(win) });
    ipcMain.on('request-file-content',
        (v, fileName: string) => { request_file_content(v, fileName, win) });
    ipcMain.on('getTestForTheMinimumCourseAvailable',
        (event, baseDirectory: string) => {
            getTestForTheMinimumCourseAvailable(baseDirectory, win);
        });
}

