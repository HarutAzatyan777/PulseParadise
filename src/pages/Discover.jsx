import React from 'react';
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const Discover = ({ isPlaying, activeSong }) => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const genreTitle = "Pop";

  console.log("API Data:", data); // Inspect the API response

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  // Accessing the array of songs from the nested data structure
  const songs = data?.data || [];

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
        <select
          onChange={() => {}}
          value=""
          className="background-color: rgb(167 139 250);
           text-color: rgb(107 33 168);
           text-balance text-wrap: balance;
            p-3 text-sm 
            rounded-lg 
            outline-none
            sm:mt-0 mt-5"
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
            key={song.key || song.id || i} // Ensure a unique key
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
