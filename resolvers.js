// import Neo4j driver
import {v1 as neo4j} from 'neo4j-driver';
import {localAudioPath} from "./constants";

// create Neo4j driver instance, here we use a Neo4j Sandbox instance. See neo4j.com/sandbox-v2, Recommendations example dataset
let driver = neo4j.driver("bolt://localhost:7687/", neo4j.auth.basic("neo4j", "p0lih4l3"));

const resolveFunctions = {
    Query: {

        hello: () => {
            return "Hello from server!"
        },
        getAudioFilePath: () => {
            return localAudioPath
        },
        getTrack: function (_, params) {
            let session = driver.session();
            let query = "MATCH (t:Track) WHERE t.uuid=$id RETURN t as track, t.uuid as id;";
            return session.run(query, params)
                .then(result => {
                    session.close();
                    result.records[0].get("track").properties.id = result.records[0].get('id');
                    return result.records[0].get("track").properties

                })
                .catch(function (error) {
                    console.log("neo4j driver ERROR", error);
                });
        },
        getAllTracks: function () {
            let session = driver.session();
            let query = "MATCH (t:Track) RETURN t as track, t.uuid as id ORDER BY t.genre;";
            return session.run(query)
                .then(result => {
                    session.close();
                    return result.records.map(record => {
                        // console.log("PROPERTIES", record.get('id'), record.get("track").properties);
                        record.get("track").properties.id = record.get('id');
                        return record.get("track").properties
                    })

                })
                .catch(function (error) {
                    console.log("neo4j driver ERROR", error);
                });
        },
        getVideo: function (_, params) {
            let session = driver.session();
            let query = "MATCH (v:Video) WHERE v.uuid=$id RETURN v as video;";
            return session.run(query, params)
                .then(result => {
                    session.close();
                    return result.records[0].get("video").properties
                })
                .catch(function (error) {
                    console.log("neo4j driver ERROR", error);
                });
        },
        getAllVideos: function () {
            let session = driver.session();
            let query = "MATCH (v:Video) RETURN v as video, v.uuid as id ORDER BY v.client;";
            return session.run(query)
                .then(result => {
                    session.close();
                    return result.records.map(record => {
                        console.log("VIDEO PROPERTIES", record.get('id'), record.get("video").properties);
                        record.get("video").properties.id = record.get('id');
                        return record.get("video").properties
                    })

                })
                .catch(function (error) {
                    console.log("neo4j driver ERROR", error);
                });
        }
    },
    Mutation: {
        addNewTrack(_, params) {
            let session = driver.session();
            let query = "CREATE (t:Track{filename: $input.filename, title: $input.title, artist: $input.artist, album: $input.album, year: $input.year, genre: $input.genre, duration: $input.duration, playCount: $input.playCount}) RETURN t as track;";
            return session.run(query, params)
                .then(result => {
                    session.close();
                    // console.log("ADD TRACK RESULT", result.records[0].get("track").properties);
                    return result.records[0].get("track").properties
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        updatePlayCount(_, params) {
            let session = driver.session();
            let query = "MATCH (t:Track {uuid: $input.id}) SET t.playCount=$input.newCount RETURN t as track, t.uuid as id;";
            return session.run(query, params)
                .then(result => {
                    session.close();
                    console.log("UPDATE PLAYS RESULT", result.records[0].get("track").properties);
                    result.records[0].get("track").properties.id = result.records[0].get('id');
                    return result.records[0].get("track").properties
                })
        }
    }
};


export default resolveFunctions;