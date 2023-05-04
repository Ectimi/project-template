import { app, BrowserWindow, Menu } from 'electron';
import { createMainWindow } from './mainWindow';
import { CustomScheme } from './CustomScheme';
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let mainWindow: BrowserWindow;
app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  mainWindow = createMainWindow();
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
    mainWindow.webContents.openDevTools({ mode: 'undocked' });
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL(`app://index.html`);
  }
});
