// IMPORT REACT HOOKS
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MoviesIndexPage() {
  const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/movies";

  const [movies, setMovies] = useState([]);

  function fetchMovies() {
    fetch(serverUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }

  useEffect(fetchMovies, []);

  return (
    <>
      <div className="container">
        <h1 className="pt-3">Movies</h1>

        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={"/movies/" + movie.id}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
