import React from 'react';
import ReactDOM from 'react-dom';
import fs from 'fs';
import musicmetadata from 'musicmetadata';

import './index.css';
import App from './App';
// import express from 'express';
// import graphQLHTTP from 'express-graphql';
import registerServiceWorker from './registerServiceWorker';
// import schema from './schema'


// const mm = new musicmetadata();

// let parser = musicmetadata(fs.createReadStream('audio/snaketails.mp3'), function (err, metadata) {
//     if (err) throw err;
//     console.log(metadata);
//
// })



function showMetaData(data) {
    musicmetadata(data, function (err, result) {
        if (err) throw err;
        console.log(result);
        // if (result.picture.length > 0) {
        //     var picture = result.picture[0];
        //     var url = URL.createObjectURL(new Blob([picture.data], {'type': 'image/' + picture.format}));
        //     var image = document.getElementById('myimg');
        //     image.src = url;
        // }
        // var div = document.getElementById('info');
        // div.innerText = JSON.stringify(result, undefined, 2);
    });
}

let url = './audio/snaketails.mp3';
let xhr = new XMLHttpRequest();
xhr.responseType = "arraybuffer";
xhr.open("get", url, true);
xhr.onload = function(e) {
    showMetaData(e.target.response);
}
xhr.send();


// let dir = './audio/';
// let xhr2 = new XMLHttpRequest();
//
// xhr2.responseType = "arraybuffer";
// xhr2.open("get", dir, true);
// xhr2.onload = function (e) {
//  console.log("HEEEELLLLLOOOOO", e.target.response);
// }
//
// xhr2.send();

// showMetaData(url);

//
// function getFiles(dir){
//     let fileList = [];
//
//     let files = fs.readdirSync(dir);
//     for(var i in files){
//         if (!files.hasOwnProperty(i)) continue;
//         var name = dir+'/'+files[i];
//         if (!fs.statSync(name).isDirectory()){
//             fileList.push(name);
//         }
//     }
//     return fileList;
// }
//
// console.log(getFiles('./audio/'));


//
// const app = express();
// app.use(graphQLHTTP({
//     schema,
//     graphql: true
// }))


//
// app.listen(5000);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
