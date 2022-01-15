import useSpotify from "../../hooks/useSpotify"
import {signOut, useSession} from "next-auth/react"
import {isPlayingState,currentTrackState} from "../../atoms/songAtom";
import { RecoilState, useRecoilState } from 'recoil';
import {useState,useEffect, useCallback} from "react";
import useSongInfo from "../../hooks/useSongInfo";
import {HeartIcon,VolumeUpIcon as VolumeDownIcon} from "@heroicons/react/outline";
import {RewindIcon,FastForwardIcon,PauseIcon,PlayIcon,ReplyIcon,VolumeUpIcon,SwitchHorizontalIcon} from "@heroicons/react/solid";
import {debounce} from "lodash";

function Player() {
   const spotifyApi = useSpotify();
   const {data:session,status} = useSession();
   const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
   const [currentTrackID, setCurrentTrackId] = useRecoilState(currentTrackState);
   const [volume,setVolume] = useState(50)
   const songInfo = useSongInfo();

    const fetchCurrentSongInfo = ()=>{
            if(!songInfo){
                spotifyApi.getMyCurrentPlayingTrack().then((res:{body:any}|null)=>{
                    if(res){
                        setCurrentTrackId(res?.body?.item?.id);
                    }
                })

                spotifyApi.getMyCurrentPlaybackState().then((data)=>{
                    setIsPlaying(data.body?.is_playing);
                });
            }
    }
    
   useEffect(()=>{
       if(spotifyApi.getAccessToken() && !currentTrackID){
        fetchCurrentSongInfo();
        setVolume(50);
       }
    
   },[currentTrackID,spotifyApi,session])


   const playPauseSong = ()=>{
       spotifyApi.getMyCurrentPlaybackState().then((data)=>{
            if(data.body.is_playing){
                spotifyApi.pause();
                setIsPlaying(false);
            }else{
                spotifyApi.play();
                setIsPlaying(true);
            }
       })   
   }


   useEffect(() => {
     if(volume>0 && volume<100){
         debouncedAdjustVolume(volume);
     }
   }, [volume])

   const  debouncedAdjustVolume = useCallback(
        debounce((volume)=>{
            spotifyApi.setVolume(volume).catch((err)=>{
                console.log(err);
            });
        },500),[]
    );

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4">
                <img src={songInfo?.album.images[0].url} className="hidden md:inline h-10 w-10" alt="song-info" height={10} width={10}/>
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>   
            {/** Center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button " />
                <RewindIcon className="button" />
                {
                    isPlaying ? (<PauseIcon onClick={playPauseSong} className="button w-10 h-10" />) : 
                                (<PlayIcon  onClick={playPauseSong} className="button w-10 h-10" /> )
                }
                <FastForwardIcon className="button"/>
                <ReplyIcon className="button"/>
            </div>
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownIcon onClick={()=> volume>0 && setVolume(volume-10)} className="button" />
                    <input className="w-14 md:w-28" 
                     onChange={e => setVolume(+(e.target.value))
                     } type="range" name="" value={volume} id="" min={0} max={100} />
                <VolumeUpIcon onClick={()=> volume<100 && setVolume(volume+10)} className="button" />
            </div>
        </div>
    )
}

export default Player
