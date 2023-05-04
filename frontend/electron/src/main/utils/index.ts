import { BrowserWindow } from 'electron';
import path from 'path';

export const getWin = (title: string) =>
  BrowserWindow.getAllWindows().filter((wins) => wins.title === title)[0];

export const getMainPath = () => {
  return path.join(__dirname);
};
