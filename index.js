const os = require('os');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const homePath = os.homedir();
const placeholder = '{{rsqConfig}}';
const configPath = path.resolve(homePath, 'qywx', 'qywx-front-server.json');
const templatePath = path.resolve(__dirname, 'view', 'index.template.html');
const indexPath = path.resolve(__dirname, 'view', 'index.html');

const config = fs.readFileSync(configPath, 'UTF-8');

const template = fs.readFileSync(templatePath, 'UTF-8');

const result = template.replace(placeholder, config);
fs.writeFileSync(indexPath, result, 'UTF-8');

app.get('/', (req, res) => {
    res.end('ok');
});

app.get('/qywxbackwebapp/index.html', (req, res) => {
    res.sendFile(indexPath);
});

app.listen(3000, () => {
    console.log('qywx front app listening on port 3000!');
});