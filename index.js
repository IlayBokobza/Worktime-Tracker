const { app,BrowserWindow,shell } = require('electron')

//for hot reload
try {
    require('electron-reloader')(module)
} catch (_) {}

const loadApp = () => {
    const mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false,
        },
        autoHideMenuBar:true,
    })

    mainWindow.loadFile('./app/pages/timer.html')
}

app.whenReady().then(loadApp)