'use strict';

const { app, BrowserWindow, Menu } = require('electron/main');
const electronSquirrelStartup = require('electron-squirrel-startup');
const path = require('path');
const url = require('url');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
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

app.whenReady().then(() => {
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
