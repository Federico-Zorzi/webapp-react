import { Link } from "react-router-dom";

export default function carousel({ movies }) {
  return (
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
              <div className={"carousel-item" + (index === 0 ? " active" : "")}>
                <div className="row">
                  <div className="col-md-5 col-lg-4 col-xl-3">
                    <img src={movie.image} className="img-carousel img-fluid" />
                  </div>
                  <div className="col-md-7 col-lg-8 col-xl-9 py-3 carousel-content">
                    <h2>
                      {movie.title} ({movie.release_year})
                    </h2>
                    <div className="movie-director">{movie.director}</div>
                    <div>
                      Genre: <span className="genre"> {movie.genre}</span>
                    </div>
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
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselMovies"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
