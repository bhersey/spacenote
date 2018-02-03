import gql from 'graphql-tag'



export const HELLO = gql`
{hello}
`;

export const GET_ALL_TRACKS = gql`
{
  getAudioFilePath
  getAllTracks{
    filename
    title
    artist
    year
    genre
    duration
  }
}`;

export const GET_TRACK = gql`
query GetTrack($input: String!) {
    getTrack(filename: $input) {
        title
        artist
        album
        year
        genre
        duration
    }
}`;