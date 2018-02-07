import gql from 'graphql-tag'



export const HELLO = gql`
{hello}
`;

export const GET_ALL_TRACKS = gql`
{
  getAudioFilePath
  getAllTracks{
    id
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
  getTrack(id: $input) {
    filename
    title
    artist
    album
    year
    genre
    duration
  }
}`;

export  const UPDATE_PLAY_COUNT = gql`
mutation UpdatePLays($input: CountUpdate) {
  updatePlayCount(input: $input) {
    id
    playCount
  }
}`;


//VIDEO
export const GET_ALL_VIDEOS = gql`
{
  getAllVideos {
    id
    url
    title
    client
    director
    description
    agency
    year
    category
  }
}`;

export const GET_VIDEO = gql`
  query GetVideo($input: String!) {
  getVideo(id: $input) {
    url
    title
    client
    agency
    director
    description
    year
    category
  }
}`;