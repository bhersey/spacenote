const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/api/musicfiles', (req, res) => {
    res.send({ express: getFiles('client/public/audio') });
});


function getFiles(dir){
    let fileList = [];

    let files = fs.readdirSync(dir);
    for(let i in files){
        if (!files.hasOwnProperty(i)) continue;
        let name = dir+'/'+files[i];

        if (!fs.statSync(name).isDirectory()){
            let encodedName = encodeURI(name).replace('client/public/','/');

            console.log(encodedName);
            fileList.push(encodedName);
        }
    }
    return fileList;
}


app.listen(port, () => console.log(`Listening on port ${port}`));