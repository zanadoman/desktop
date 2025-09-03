'use strict';

const { app, BrowserWindow, Menu, ipcMain } = require('electron/main');
const electronSquirrelStartup = require('electron-squirrel-startup');
const log = require('electron-log');
const path = require('path');
const { updateElectronApp, UpdateSourceType } = require('update-electron-app');
const url = require('url');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '/preload.js')
    }
  });

  Menu.setApplicationMenu(null);

  if (app.isPackaged) {
    win.loadURL(url.format({
      pathname: path.join(__dirname, '/dist/Desktop/browser/index.html'),
      protocol: 'file',
      slashes: true
    }));
  } else {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools({ mode: 'detach' });
  }
};

if (electronSquirrelStartup) {
  app.quit();
}

updateElectronApp({
  updateSource: {
    type: UpdateSourceType.ElectronPublicUpdateService,
    repo: 'zanadoman/desktop'
  },
  logger: log
});

app.whenReady().then(() => {
  ipcMain.on('log', (_, message) => {
    console.log(message);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
