import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  const dispatch = useDispatch(); // Optional, if needed for handling play/pause actions
  const releaseDate = new Date(song.attributes?.releaseDate).toLocaleDateString(); // Format release date

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.attributes?.name === song.attributes?.name ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        {/* Image displayed directly without loader */}
        <img 
          alt="song_img" 
          src={song.attributes?.artwork?.url.replace('{w}x{h}', '250x250')} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Song Info */}
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.id}`}>
            {song.attributes?.name}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={song.relationships?.artists?.data ? `/artists/${song.relationships.artists.data[0]?.id}` : '/top-artists'}>
            {song.attributes?.artistName}
          </Link>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Released: {releaseDate}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
