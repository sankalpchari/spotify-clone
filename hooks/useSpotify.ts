import {useSession,signIn} from "next-auth/react"
import { useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-node"
import {spotifyApi} from "../lib/spotify"


function useSpotify() {
    const {data:session,status} = useSession()
    useEffect(()=>{
        if(session){
            if(session.error === "refreshAccessTokenError"){
                signIn();
            }
            const accessToken:string =  <string>session.accessToken;
            if(accessToken!=undefined){
                spotifyApi.setAccessToken(accessToken)
            }
        }
    },[session])
    return spotifyApi
}

export default useSpotify
