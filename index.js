const os = require('os');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const homePath = os.homedir();
const placeholder = /(<script>[\s\S]*?rsqConfig[\s\S]*?){[\s\S]*?}([\s\S]*?<\/script>)/g;
const configPath = path.resolve(homePath, 'qywx', 'qywx-front-server.json');
const indexPath = path.resolve(__dirname, 'view', 'index.html');
const backupPath = path.resolve(__dirname, 'view', 'index.bak.html');

//  备份旧文件
fs.renameSync(indexPath, backupPath);

const config = fs.readFileSync(configPath, 'UTF-8');

const template = fs.readFileSync(backupPath, 'UTF-8');

const result = template.replace(placeholder, '$1' + config + '$2');
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