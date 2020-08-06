function myFunction() {
	var x = document.getElementById("myFile").files[0];
	fetch("http://localhost:4707/fileupload", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			filePath: x.path,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("output-path").innerHTML = data;
		})
		.then(() => {
			document.getElementById("share-button").innerHTML = "Sharing";
		});
}

fetch("https://push-notifications-app.herokuapp.com/notif")
	.then((response) => response.json())
	.then((data) => {
		if (!data) {
			document.getElementById("notif-heading").innerHTML =
				"No New Notifications";
			document.getElementById("notif-desc").innerHTML =
				"There are no new notifications or you are not connected to internet. Use Ctrl+R to refresh.";
		} else {
			document.getElementById("notif-heading").innerHTML = data.heading;
			document.getElementById("notif-desc").innerHTML = data.notif;
		}
	});

function bugAdd() {
	window.open("mailto:adityakrishnaoff@gmail.com");
}

function closeNotif() {
	document.getElementById("mainNotif").style.visibility = "hidden";
}

function openNotif() {
	document.getElementById("mainNotif").style.visibility = "visible";
}
