const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain } = require("electron");
const connectDB = require("./config/db");
const Bookmark = require("./models/bookmark");
//connect to DB
connectDB();
let mainWindow;

let isDev = false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    show: false,
    backgroundColor: "white",
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createMainWindow); //app ready

//fetch records
ipcMain.on("records:load", sendRecords);
async function sendRecords() {
  const bookmarks = await Bookmark.find().sort({ created: 1 });
  console.log(bookmarks);
  mainWindow.webContents.send("records:get", JSON.stringify(bookmarks)); //send asynchronous msg to the renderer process via channel.
} //do not use any arrow functions to created this type of methods

//add records
ipcMain.on("records:add", async (e, item) => {
  try {
    console.log(item);
    await Bookmark.create(item);
    sendRecords(); //calling the sendrecord function to fetch again and send to the fetchced values to the renderer process.
  } catch (error) {
    console.log(error);
  }
});
//delete records
ipcMain.on('records:delete',async (e,id)=>{
	try {
		await Bookmark.findOneAndDelete({_id:id});
		sendRecords(); 
	} catch (err) {
		console.log(err);
	}
})
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;
