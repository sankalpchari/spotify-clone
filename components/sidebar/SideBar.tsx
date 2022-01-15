import type { NextComponentType } from 'next'
import {signOut, useSession} from "next-auth/react"
import {HomeIcon,
        SearchIcon,
        LibraryIcon,
        PlusCircleIcon,
        HeartIcon,
        RssIcon
    } from "@heroicons/react/outline"

import { useState,useEffect } from 'react';
import useSpotify from "../../hooks/useSpotify";
import { useRecoilState } from 'recoil';
import {PlaylistIdState} from "../../atoms/playlistAtom"

interface listValue {
    length: number;
    name: string;
}

const Sidebar:NextComponentType = () =>{
    const spotify = useSpotify();
    const {data:session,status} = useSession()
    const [playlist,setPlaylist] = useState<SpotifyApi.PlaylistObjectSimplified[]>([]);
    const [playlisId,setplaylistIdState] = useRecoilState(PlaylistIdState)
    useEffect(() => {
        if(spotify.getAccessToken()){
            spotify.getUserPlaylists().then((res)=>{
                  setPlaylist(res.body.items)

                console.log(spotify)
            }).catch(e=>{

            })
        }
    }, [session,spotify])

    return (
        <div className="text-gray-500 p-5 text-sm border-r 
                        border-gray-900 overflow-y-scroll 
                        h-screen scrollbar-hide hidden md:inline-flex
                        lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] pb-36"
        >

                <div className="space-y-4">
                    <button className="flex items-center space-x-2 hover:text-white">
                        <HomeIcon className="h-5 w-5" />
                        <p>Home</p>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <SearchIcon className="h-5 w-5" />
                        <p>Search</p>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <LibraryIcon className="h-5 w-5" />
                        <p>Your Library</p>
                    </button>
                    <hr className="border-t-[0.1px] border-gray-900" />

                    <button className="flex items-center space-x-2 hover:text-white">
                        <PlusCircleIcon className="h-5 w-5" />
                        <p>Create Playlist</p>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <HeartIcon className="h-5 w-5" />
                        <p>Liked Songs</p>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <RssIcon className="h-5 w-5" />
                        <p>Your Episodes</p>
                    </button>
                    <hr className="border-t-[0.1px] border-gray-900" />
                    {
                        playlist.length >0 ? playlist.map((list)=>{
                           return  <p className='cursor-pointer hover:text-white' onClick={()=>{setplaylistIdState(list.id)}} key={list.id}>{list.name}</p>
                        }) :
                        <p className='cursor-pointer hover:text-white'>Playlist is empty</p>
                    }
                  
                    
                </div>
        </div>);
}


export default Sidebar