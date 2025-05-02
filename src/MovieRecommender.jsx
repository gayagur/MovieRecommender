
import React, { useState } from 'react';

export default function MovieRecommender() {
  const [favoriteMovies, setFavoriteMovies] = useState(['']);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (favoriteMovies.filter(Boolean).length === 0) return;

    setLoading(true);
    try {
      const result = {
        recommendations: [
          {
            title: "Inception",
            year: 2010,
            genre: ["Sci-Fi", "Action"],
            description: "A thief enters people’s dreams to steal secrets.",
            rating: 8.8,
            director: "Christopher Nolan",
            netflix_link: "https://www.netflix.com/title/70131314"
          },
          {
            title: "The Matrix",
            year: 1999,
            genre: ["Sci-Fi", "Action"],
            description: "A hacker discovers the world is a simulation.",
            rating: 8.7,
            director: "The Wachowskis",
            netflix_link: "https://www.netflix.com/title/20557937"
          }
        ]
      };
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    }
    setLoading(false);
  };

  const addMovieInput = () => {
    if (favoriteMovies.length < 5) {
      setFavoriteMovies([...favoriteMovies, '']);
    }
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
      <h1 className="text-4xl font-bold mb-4 text-center">Netflix Movie Recommendations</h1>
      <p className="text-gray-400 mb-6 max-w-lg text-center">
        Tell us about your favorite movies (up to 5) and we'll recommend 10 similar ones
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
          {loading ? "Finding Recommendations..." : "Get Recommendations"}
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {recommendations.map((movie, index) => (
            <div key={index} className="bg-white text-black p-4 rounded shadow w-full max-w-md">
              <h2 className="font-bold text-xl mb-1">{movie.title} ({movie.year})</h2>
              <p className="text-sm text-gray-600 mb-2">{movie.description}</p>
              <p className="text-sm text-gray-500 mb-1">Genres: {movie.genre.join(', ')}</p>
              <p className="text-sm text-gray-500 mb-1">Director: {movie.director}</p>
              <p className="text-sm text-yellow-600 font-bold">Rating: {movie.rating}</p>
              <a href={movie.netflix_link} target="_blank" className="text-red-500 text-sm underline mt-2 inline-block">Watch on Netflix →</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
