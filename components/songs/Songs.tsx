import {useRecoilValue } from 'recoil';
import { PlaylistIdState,playListState } from '../../atoms/playlistAtom';
import {spotifyPlaylistInterface,trackes,Track} from  "../Center/interface"
import Song from "./Song";

const Songs = () => {
    const playlist = useRecoilValue<spotifyPlaylistInterface|null>(playListState)
    return (
        <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
            {
                playlist!=null && playlist.tracks.items.map((track,index)=>{
                    return <Song key={track.track.id} track={track.track} order={index}/>
               })
            } 
        </div>
    )
}

export default Songs
