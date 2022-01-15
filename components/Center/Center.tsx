import {signOut, useSession} from "next-auth/react"
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useState,useEffect } from 'react';
import {shuffle} from "lodash"
import { useRecoilState, useRecoilValue } from 'recoil';
import { PlaylistIdState,playListState } from '../../atoms/playlistAtom';
import useSpotify from "../../hooks/useSpotify";
import Songs from "../songs/Songs"

const Center = ()=>{
    const {data:session} = useSession();

    const colors:string[] = [
        "from-indigo-500",
        "from-green-500",
        "from-yellow-500",
        "from-red-500",
        "from-purple-500",
        "from-pink-500"
    ];

    const icon = session?.user?.image ?  session?.user?.image : "/icon.jpg"
    const [color, setColor] = useState<string | undefined>("");
    const playlisId = useRecoilValue(PlaylistIdState)
    const spotifyApi = useSpotify()
    const [playlist,setPlaylist] = useRecoilState<any>(playListState);
    var img =""

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlisId])

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getPlaylist(playlisId).then((res)=>{
               setPlaylist(res.body);
         }).catch(e=>{
                console.log(e)
        })
        }else{
            console.log("token not found")
        }
    }, [spotifyApi,playlisId])


    return (
            <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
                <header className='absolute top-5 right-8'>
                        <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 pr-2 text-white border-2 border-gray-400' onClick={()=>signOut()} >
                            <div>
                                <img src={icon} alt="user" className='rounded-full w-10 h-10' />
                            </div>
                            <h2>{session?.user?.name}</h2>
                            <ChevronDownIcon className='h-5 w-5' />
                        </div>
                    </header>
                    <section className={`flex items-end space-x-7 
                                        bg-gradient-to-b to-black ${color} h-80  
                                        text-white p-8`}>
                    <img src={playlist?.images?.[0]?.url} alt="Playlist Image" className='h-44 w-44 shadow-2xl' />
                    <div>
                        <p>PLAYLIST</p>
                        <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                    </div>

                </section>
                <section>
                    <Songs />    
                </section> 
            </div>

        );
}

export  default Center;