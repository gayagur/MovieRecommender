// TMDB-based movie recommendation component
import React, { useState } from 'react';

const API_KEY = "60b9b998799ce76812cf35030e309ecc"; // TMDB API Key

export default function MovieRecommender() {
  const [favoriteMovies, setFavoriteMovies] = useState(['']);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    const queries = favoriteMovies.filter(Boolean);
    if (queries.length === 0) return;

    setLoading(true);
    try {
      const allResults = [];

      for (const movieName of queries) {
        const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`);
        const searchData = await searchRes.json();
        if (searchData.results.length === 0) continue;

        const movieId = searchData.results[0].id;
        const recRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`);
        const recData = await recRes.json();
        allResults.push(...recData.results);
      }

      const unique = Array.from(new Map(allResults.map(m => [m.id, m])).values());
      setRecommendations(unique.slice(0, 10));
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }
    setLoading(false);
  };

  const addMovieInput = () => {
    if (favoriteMovies.length < 5) setFavoriteMovies([...favoriteMovies, '']);
  };

  const removeMovieInput = (index) => {
    if (favoriteMovies.length > 1) {
      const newMovies = favoriteMovies.filter((_, i) => i !== index);
      setFavoriteMovies(newMovies);
    }
  };

  const handleMovieChange = (index, value) => {
    const newMovies = [...favoriteMovies];
    newMovies[index] = value;
    setFavoriteMovies(newMovies);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center">TMDB Movie Recommendations</h1>
      <p className="text-gray-400 mb-6 max-w-lg text-center">
        Enter up to 5 of your favorite movies, and we'll fetch recommendations for you!
      </p>

      <div className="space-y-4 mb-8 w-full max-w-md">
        {favoriteMovies.map((movie, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={movie}
              onChange={(e) => handleMovieChange(index, e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded"
              placeholder="Enter movie title..."
            />
            {favoriteMovies.length > 1 && (
              <button onClick={() => removeMovieInput(index)} className="text-red-400">✕</button>
            )}
          </div>
        ))}
        {favoriteMovies.length < 5 && (
          <button onClick={addMovieInput} className="bg-white text-black px-4 py-2 rounded w-full">
            + Add Another Movie
          </button>
        )}
        <button
          onClick={getRecommendations}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Fetching..." : "Get Recommendations"}
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {recommendations.map((movie, index) => (
            <div key={index} className="bg-white text-black p-4 rounded shadow w-full max-w-md">
              <h2 className="font-bold text-xl mb-1">{movie.title} ({movie.release_date?.split('-')[0]})</h2>
              <p className="text-sm text-gray-600 mb-2">{movie.overview}</p>
              <p className="text-sm text-yellow-600 font-bold">Rating: {movie.vote_average}</p>
              {movie.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="mt-2 rounded" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
