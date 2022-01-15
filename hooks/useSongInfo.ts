import useSpotify from "./useSpotify";
import {signOut, useSession} from "next-auth/react";
import {currentTrackState} from "../atoms/songAtom";
import {useRecoilValue } from 'recoil';
import { useState,useEffect } from "react";
import {Track} from "../components/Center/interface";

const useSongInfo = () => {
    const [songinfo,setSongInfo] = useState<Track|null>(null);
    const spotifyApi = useSpotify();
    const currentTrackID = useRecoilValue(currentTrackState);

    console.log("songs hook",currentTrackID);

    useEffect(()=>{
            const fetchInfo = async () =>{
                if(currentTrackID){
                    const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackID}`,{
                        headers:{
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }).then(res=>{ return res.json()})
                    
                    if(trackInfo){
                        setSongInfo(trackInfo);
                    }
                }
            }
            fetchInfo();
    },[currentTrackID,spotifyApi])

    return songinfo
}

export default useSongInfo
