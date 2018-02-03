import bodyParser from 'body-parser';
import cors from 'cors';
import chokidar from 'chokidar';
import fs from 'fs';
import express from 'express';
import morgan from 'morgan';
import musicmetadata from 'musicmetadata';
import schema from './schema';
import {graphiqlExpress, graphqlExpress} from 'graphql-server-express';
import {createApolloFetch} from 'apollo-fetch';
import {pathToClientAudioFiles} from 'constants';

const app = express().use('*', cors());
const port = process.env.PORT || 5000;
const uri = 'http://localhost:5000/graphql/';
const apolloFetch = createApolloFetch({ uri });

// const pathToClientAudioFiles = 'client/public/audio/';
// const localAudioPath = './audio/';

app.use('/graphql', morgan('combined'), bodyParser.json(), graphqlExpress({
    schema,
    context: {},
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));


let watcher = chokidar.watch(pathToClientAudioFiles, {ignored: "client/public/audio/.DS_Store", persistent: true});

watcher
    .on('add', function (path) {
        checkForNewFile(path)
    })
    .on('change', function (path) {
        console.log('File', path, 'has been changed');
    })
    .on('unlink', function (path) {
        console.log('File', path, 'has been removed');
    })
    .on('error', function (error) {
        console.error('Error happened', error);
    })


function checkForNewFile(fp) {

    let fileNameWithoutPath = fp.replace(pathToClientAudioFiles,'');
    // console.log('File', fileNameWithoutPath, 'has been added');
    apolloFetch({query: `{getAllTracks {filename}}`})
        .then(result => {
            const {data, errors, extensions} = result;

            // console.log("RETURN TRIP", data.getAllTracks);

            let dbFiles = data.getAllTracks;
            let fileExists = dbFiles.find( function( file ){
                return file.filename === fileNameWithoutPath;
            } );

            fileExists ? console.log("FILE EXISTS"): addNewFile(fp)
        })
        .catch(error => {
            //respond to a network error
            console.log(error);
        });

}

function addNewFile(path) {
    // console.log(path);

    let mData = getMetaData(path)
        .then( (res) => {
            console.log("MDATA", res);

            apolloFetch({query: `mutation addNewTrack($input: TrackInput! ) {
                                  addNewTrack(input: $input) {
                                    filename
                                    title
                                    artist
                                    album
                                    year
                                    genre
                                    duration
                                  }
                                }`,
                        variables: {
                            "input": {
                                "filename": path.replace(pathToClientAudioFiles,''),
                                "title": res.title,
                                "artist": res.artist,
                                "album": res.album,
                                "year": res.year,
                                "genre": res.genre,
                                "duration": res.duration
                            }
                        }
            }).then(result => {
                const {data, errors, extensions} = result;

                console.log("RETURN FROM ADD TRACK", data);
            })

        }
    ).catch( (err)=>console.log("ERROR: ", err));
}

function getMetaData(path) {
    return new Promise(function(resolve,reject) {
        musicmetadata(fs.createReadStream(path), {duration: true}, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}


app.listen(port, () => console.log(
    `GraphQL Server running on http://localhost:${port}/graphql`
));