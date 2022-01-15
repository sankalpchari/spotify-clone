import type { NextComponentType} from 'next'
import { ComponentProps, ComponentType, PropsWithChildren } from 'react';
import {Track} from "../Center/interface";
import { RecoilState, useRecoilState } from 'recoil';
import {isPlayingState,currentTrackState} from "../../atoms/songAtom";
import useSpotify from "../../hooks/useSpotify";

interface SongProps {
    track:Track;
    order:number;
}

type timetype = number | string;

const Song = ({order,track}:SongProps) => {
    const spotifyApi = useSpotify();
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [currentTrackID, setCurrentTrackId] = useRecoilState(currentTrackState);

    const playSong  = (id:string )=>{
        console.log(id);
        setCurrentTrackId(id)
        setIsPlaying(true);

        // spotifyApi.play({
        //     uris:[track.uri],
        // })
    }

    return (
        <div className='grid grid-cols-2 text-gray-500 py-4 px-5  hover:bg-gray-900 rounded-lg cursor-pointer'
            onClick={()=>playSong(track.id)}
        >
            <div className='flex items-center space-x-4'>
                <p>{order+1}</p>
                <img src={track.album.images[0].url} alt="" height={30} width={30}/>
                <div>
                    <p className='w-36 lg:w-64 truncate text-white'>{track.name}</p>
                    <p className='w-40'>{track.artists[0].name}</p>
                </div>
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='hidden md:inline w-40'>{track.album.name}</p>
                <p>{convertTimeStampToTime(track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song;


function convertTimeStampToTime(duration:number):string{
   if(duration){
    var seconds : timetype = Math.floor((duration / 1000) % 60);
    var minutes : timetype= Math.floor((duration / (1000 * 60)) % 60);

      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
   }
   return "";
}