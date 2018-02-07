// import graphql-tools
import { makeExecutableSchema } from 'graphql-tools';

// we’ll define our resolver functions in the next section
import resolvers from './resolvers';

const typeDefs = `
 type Hello {
    hello: String!
 }
 
 type Track {
    id: ID!
    filename: String!
    title: String
    artist: [String]
    album: String
    year: Int
    genre: [String]
    duration: Float
    playCount: Int
  }
  
  type Video {
    id: ID!
    url: String!
    title: String
    client: String
    description: String
    director: String
    agency: String
    year: Int
    category: [String]
  }
 
 input TrackInput {
    filename: String!
    title: String
    artist: [String]
    album: String
    year: Int
    genre: [String]
    duration: Float
 }
 
 input CountUpdate {
    id: ID!
    newCount: Int!
 }
 
 type Query {
    getTrack (id:String!): Track
    getAllTracks: [Track]
    getVideo (id:String!): Video
    getAllVideos: [Video]
    getAudioFilePath: String!
    hello: String
 }
 
 type Mutation {
   addNewTrack (input:TrackInput): Track
   updatePlayCount (input: CountUpdate): Track
  }
`;


export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers,
});