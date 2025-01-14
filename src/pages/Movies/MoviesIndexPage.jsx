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

  console.log(movies);
  useEffect(fetchMovies, []);

  return (
    <>
      <div className="container">
        {/* CAROUSEL */}
        <div
          id="carouselMovies"
          className="carousel slide my-4"
          data-bs-ride="true"
        >
          <div className="carousel-indicators">
            {movies &&
              movies.map((movie, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselMovies"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current="true"
                  aria-label={"Slide" + (index + 1)}
                ></button>
              ))}
          </div>

          <div className="carousel-inner">
            {movies &&
              movies.map((movie, index) => (
                <Link key={movie.id} to={"/movies/" + movie.id}>
                  <div
                    className={"carousel-item" + (index === 0 ? " active" : "")}
                  >
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-xl-3">
                        <img
                          src={movie.image}
                          className="img-carousel img-fluid"
                        />
                      </div>
                      <div className="col-md-7 col-lg-8 col-xl-9 py-3">
                        <h2>
                          {movie.title} ({movie.release_year})
                        </h2>
                        <div>{movie.director}</div>
                        <span className="badge text-bg-dark">
                          {movie.genre}
                        </span>
                        <p>{movie.abstract}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselMovies"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselMovies"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <h1>Movies</h1>

        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 py-3 g-3">
          {movies.map((movie) => (
            <Link key={movie.id} to={"/movies/" + movie.id}>
              <div className="col card-movie">
                <img src={movie.image} className="img-fluid poster" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
