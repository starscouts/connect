const { app, BrowserWindow, Tray, Menu } = require('electron');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 384,
        height: 640,
        resizable: false,
        show: false,
        frame: false,
        //alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html#' + encodeURIComponent(app.getPath("userData")));

    /*mainWindow.on('blur', () => {
        mainWindow.hide();
    });*/

    let menu = Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                {
                    role: "quit"
                }
            ]
        },
        {
            role: "editMenu"
        },
        {
            role: "viewMenu"
        },
        {
            role: "window"
        },
        {
            role: "shareMenu"
        }
    ]);

    mainWindow.setMenu(menu);
    Menu.setApplicationMenu(menu);

    return mainWindow;
}

app.whenReady().then(() => {
    //if (process.platform === "darwin") app.dock.hide();

    let tray = new Tray("./tray/16x16Template@2x.png");
    tray.setToolTip("Equestria.dev Connect");

    let window = createWindow();

    tray.on('click', (event, bounds, position) => {
        window.setPosition(bounds.x, bounds.y);

        if (window.isVisible()) {
            window.hide();
        } else {
            window.show();
        }
    });
})