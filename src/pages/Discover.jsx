import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = ({ isPlaying, activeSong }) => {
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState('Pop'); // Set a default genre
  const { data, isFetching, error } = useGetSongsByGenreQuery(selectedGenre);

  console.log("API Data:", data);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  const songs = Array.isArray(data?.data) ? data.data : [data?.data];

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {selectedGenre}</h2>
        <select
          onChange={(e) => {
            const genre = e.target.value;
            setSelectedGenre(genre);
            dispatch(selectGenreListId(genre)); // Dispatch action if needed
          }}
          value={selectedGenre}
          className="background-color: rgb(167 139 250); text-color: rgb(107 33 168); p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.id || i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
