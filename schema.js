// import graphql-tools
import { makeExecutableSchema } from 'graphql-tools';

// we’ll define our resolver functions in the next section
import resolvers from './resolvers';

const typeDefs = `
 type Track {
    filename: String!
    title: String
    artist: [String]
    album: String
    year: Int
    genre: [String]
    duration: Float
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
 
 type CreateTrackPayload {
  # The todo that was created. It is nullable so that if there is
  # an error then null won’t propagate past the \`todo\`.
  track: Track
  }
 
 type Query {
    getTrack (filename:String!): Track
    getAllTracks: [Track]
    hello: String
 }
 
 type Mutation {
   addNewTrack (input:TrackInput): Track
  }
`;


export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers,
});