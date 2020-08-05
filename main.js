const { app, BrowserWindow } = require("electron");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const internalIp = require("internal-ip");
let mainWindow;
const PORT = 4707;
server.use(bodyParser.json());
server.use(cors());

const createMainWindow = () => {
	mainWindow = new BrowserWindow({
		title: "Image Shrink",
		width: 500,
		height: 600,
	});

	mainWindow.loadURL("file://" + __dirname + "/index.html");
};
app.on("ready", createMainWindow);

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
