"use strict";

import { app, protocol, BrowserWindow, BrowserView } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

const isDevelopment = process.env.NODE_ENV !== "production";

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

const Store = require("electron-store");
const store = new Store();

async function createBrowserWindow() {
  var windowSize = store.get("window-size");
  var windowWitdh = 1000;
  var windowHeight = 750;
  if (windowSize) {
    console.log("2");
    console.log(windowSize);
    windowWitdh = windowSize.width;
    windowHeight = windowSize.height;
  } else {
    console.log("1"); 
    console.log(windowSize);
  }
  const win = new BrowserWindow({
    width: windowWitdh,
    height: windowHeight,
    minWidth: 1000,
    minHeight: 750,
    backgroundColor: "#000",
    show: false,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("will-resize", (event, newBounds) => {
    store.set("window-size", {
      width: newBounds.width,
      height: newBounds.height
    });
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }

  return win;
}

function createBrowserView(win) {
  const view = new BrowserView({});
  win.setBrowserView(view);
  view.setBounds({
    x: 180,
    y: 0,
    width: win.getBounds().width - 180,
    height: win.getBounds().height
  });
  view.setAutoResize({
    width: true,
    height: true
  });
  view.webContents.loadURL("https://weread.qq.com");
}

function createBrowserWindowAndView() {
  createBrowserWindow().then(win => createBrowserView(win));
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createBrowserWindowAndView();
});

app.on("ready", async () => {
  createBrowserWindowAndView();
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
