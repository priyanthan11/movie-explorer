import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { getPopularMovies, getSearchMovies } from "../services/api";
import "../css/Home.css";
function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies....");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  // const movies = [
  //   { id: 1, title: "Jhon Wick", release_date: "2020" },
  //   { id: 2, title: "Terminator", release_date: "1999" },
  //   { id: 3, title: "Avatar", release_date: "2009" },
  // ];
  const haldeSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await getSearchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      setError("Failed to load movie");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="home">
      <form onSubmit={haldeSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          {" "}
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading .... </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            // movie.title.toLowerCase().startsWith(searchQuery) && (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
