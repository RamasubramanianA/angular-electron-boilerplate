import { app, BrowserWindow,  Menu } from 'electron';
import * as path from 'path';

const windowStateKeeper = require('electron-window-state');
import { ipc } from './require/IPC/ipc_main'


let win: BrowserWindow;
let ipcReady: boolean;

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
  // win.maximize();
  win.focus();
  win.on('focus', () => {
    console.log('ready-to-show');
    if (! ipcReady){
      ipc(win);
      ipcReady = true;
    } else {
      console.log("IPC is ready already.");
    }
  });
}
