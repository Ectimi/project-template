import path from 'path';
import { getMainPath } from '../utils';
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

let mainWindow: BrowserWindow | null = null;

export function createMainWindow(
  options: BrowserWindowConstructorOptions = {}
) {
  if (mainWindow !== null) {
    return mainWindow;
  }
  const defaultOptions: BrowserWindowConstructorOptions = {
    title: 'main',
    width: 800,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: true,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
      preload: path.resolve(getMainPath(), 'preload/index.js'),
    },
  };

  mainWindow = new BrowserWindow(Object.assign({}, defaultOptions, options));
  return mainWindow;
}
