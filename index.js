const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const window = new BrowserWindow({
    show: false,
    title: "Youtube Offline",
    icon: path.join(__dirname, "assets/favicon.ico"),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  window.maximize();
  window.show();
  window.loadFile('site/index.html');
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    };
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});