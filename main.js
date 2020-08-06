const { app, BrowserWindow, Menu } = require("electron");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const internalIp = require("internal-ip");
let mainWindow;
const PORT = 4707;
server.use(bodyParser.json());
server.use(cors());

process.env.NODE_ENV = "production";

isDev = process.env.NODE_ENV !== "production" ? true : false;

let platform;

if (process.platform === "win32") {
	platform = "windows";
} else if (process.platform === "darwin") {
	platform = "mac";
} else {
	platform = "linux";
}

const createMainWindow = () => {
	mainWindow = new BrowserWindow({
		title: "File Share",
		width: 500,
		height: 600,
		resizable: false,
		icon: `${__dirname}/fileshare-akg.png`,
		webPreferences: {
			devTools: false,
		},
	});

	mainWindow.loadURL("file://" + __dirname + "/index.html");
};
app.on("ready", () => {
	createMainWindow();

	const mainMenu = Menu.buildFromTemplate(menu);
	Menu.setApplicationMenu(mainMenu);
	mainWindow.on("closed", () => (mainWindow = null));
});

const menu = [
	{
		label: "File",
		submenu: [
			{
				label: "Quit",
				click: () => app.quit(),
			},
		],
	},
];

let file = "";

server.post("/fileupload", async (req, res) => {
	file = req.body.filePath;
	const ip = await internalIp.v4();
	res.json(ip + ":" + PORT);
});

server.get("/", (req, res) => {
	res.download(file);
});

server.listen(PORT);
