const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const fs = require('node:fs')
const os = require('node:os')

const ruta = path.join(os.homedir(), 'Cefam', 'Personal')
if (!fs.existsSync(ruta)) {
  // Crear la subcarpeta dentro de la carpeta principal
  fs.mkdir(ruta, { recursive: true }, (err) => {
    if (err) {
      return console.error('Error al crear la subcarpeta:', err)
    }
  })
}

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadFile('Modules/Front-end/main.html')
  mainWindow.setMenuBarVisibility(true)

  mainWindow.on('closed', () => {
    app.quit()
  })
})
