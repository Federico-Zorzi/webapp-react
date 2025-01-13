// IMPORT REACT HOOKS
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// IMPORT COMPONENTS
import Card from "../../components/mainComponents/Card";

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
        <h1>Movies</h1>

        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
          {movies.map((movie) => (
            <Link key={movie.id} to={"/movies/" + movie.id}>
              <div className="col card-movie">
                <Card movie={movie} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
