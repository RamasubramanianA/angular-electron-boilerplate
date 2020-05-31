import { app, BrowserWindow, ipcMain, Menu, dialog } from 'electron';
import * as path from 'path';
import { DtoSystemInfo } from '../ipc-dtos/dtosysteminfo';
import * as os from 'os';
import {getFileListInDir , fileContent, isFileExist} from './require/fs'
const windowStateKeeper = require('electron-window-state');


let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {

  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });

  // *********  set nodeIntegration false in production

  win = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
    'minHeight': 500,
    'minWidth': 850,
    webPreferences: {
      // Disabled Node integration
      nodeIntegration: false,
      // protect against prototype pollution
      contextIsolation: true,
      // turn off remote
      enableRemoteModule: false,
      // Preload script
      preload: path.join(app.getAppPath(), 'dist/preload', 'preload.js')
    }

  });
  // console.log("My app path",app.getPath('userData'));
  // https://stackoverflow.com/a/58548866/600559
  Menu.setApplicationMenu(null);

  win.loadFile(path.join(app.getAppPath(), 'dist/renderer', 'index.html'));

  win.on('closed', () => {
    win = null;
  });

    // Let us register listeners on the window, so we can update the state
    // automatically (the listeners will be removed when the window is closed)
    // and restore the maximized or full screen state
    mainWindowState.manage(win);
}

isFileExist('F:\\D\\YenBookcourse\\C_Programming\\TOC.JSON')
.then((val)=>console.log("value on isFileExist call  :", val))
.catch( err => console.log('error on isFileExist call: ', err))
;
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
  let folderName: string ;
   dialog.showOpenDialog({ properties: ['openDirectory'] })
  .then(val=>
    {
      folderName = val.filePaths[0];
      console.log('folderName: ', folderName);
      if (win) {
        win.webContents.send('folderName', folderName);
      }
    });
});




ipcMain.on('request-file-list', async () => {
  console.log('request-file-list in main.' );

  if (win) {
    let files = await getFileListInDir();
    console.log('files await: ', files);
    win.webContents.send('files-in-dir', files);
  }
  else
  console.log('win not available. ');


});


ipcMain.on('request-file-content' , async ( v,fileName:string) => {
  console.log('request-file-content in main -->.' , fileName);

  if (win) {
    let content: string = await fileContent(fileName);
    console.log('files after await : ', content);
    win.webContents.send('file-content', content);
  }
  else
  console.log('win not available. ');
});
