// import Neo4j driver
import {v1 as neo4j} from 'neo4j-driver';

// create Neo4j driver instance, here we use a Neo4j Sandbox instance. See neo4j.com/sandbox-v2, Recommendations example dataset
let driver = neo4j.driver("bolt://localhost:7687/", neo4j.auth.basic("neo4j", "p0lih4l3"));

const resolveFunctions = {
    Query: {

        getTrack(_, params) {
            // query Neo4j for matching tracks
            let session = driver.session();
            let query = "MATCH (t:Track) WHERE t.filename=$filename RETURN t as track;"
            return session.run(query, params)
                .then(result => {
                        return result.records[0].get("track").properties
                    }
                )
        },
        getAllTracks() {
            let session = driver.session();
            let query = "MATCH (t:Track) RETURN t as track;"
            return session.run(query)
                .then(result => {

                    return result.records.map(record => {
                        return record.get("track").properties
                    })
                })
        }
    },
    Mutation: {
        addNewTrack(_, params) {
            let session = driver.session();
            let query = "CREATE (t:Track{filename: $input.filename, title: $input.title, artist: $input.artist, album: $input.album, year: $input.year, duration: $input.duration}) RETURN t as track;";
            return session.run(query, params)
                .then(result => {
                    // console.log("ADD TRACK RESULT", result.records[0].get("track").properties);
                    return result.records[0].get("track").properties
                })
        }
    }
};


export default resolveFunctions;