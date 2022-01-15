import SpotifyWebApi from "spotify-web-api-node"

const scopes:string =[
    "user-read-email",
    "playlist-read-collaborative",
    "playlist-read-private",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
].join(",")

const params = { scope:scopes,};

const queryParamsString:string = new URLSearchParams(params).toString();

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString}`;

export const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRATE!,
})


 