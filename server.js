const express = require('express');
//const serveStatic = require("serve-static")
const path = require('path');
app = express();
//app.use(serveStatic(path.join(__dirname, 'dist')));

app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || 80;
app.listen(port);

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});