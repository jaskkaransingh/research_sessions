import {useState, useEffect} from 'react';
import {searchMovie,getTopMovies} from './api';
import MovieCard from "./MovieCard"
import "./css/styles.css"
function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        async function loadTopMovies() {
            const topMovies = await getTopMovies();
            setMovies(topMovies);
        }
        loadTopMovies();
    }, []);
    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim() === "") return;
        const results = await searchMovie(query);
        setMovies(results);
    };
    return (
        <div className="app">
            <h1>Movie Search</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                />
                <button type="submit">Search</button>
            </form>
            <div className="movie-grid">
                {movies.length > 0 ? (


                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    );
}
export default App;