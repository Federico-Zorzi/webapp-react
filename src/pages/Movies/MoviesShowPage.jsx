// IMPORT REACT HOOKS
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// IMPORT COMPONENTS
import Card from "../../components/mainComponents/Card";

export default function MoviesShowPage() {
  const { id } = useParams();
  const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/movies/" + id;

  const [movie, setMovie] = useState([]);

  // FETCH FUNCTION FOR SINGLE MOVIE
  function fetchMovie() {
    fetch(serverUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  }
  useEffect(fetchMovie, []);

  console.log(movie.reviews);

  return (
    <>
      <div className="container">
        <section className="card-movie">
          <Card movie={movie} />
        </section>

        <section className="review">
          <div className="row">
            {movie.reviews &&
              movie.reviews.map((review, index) => (
                <div key={index} className="col">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col">{review.reviews_author_name}</div>
                        <div className="col text-end vote">{review.vote}</div>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{review.text}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
