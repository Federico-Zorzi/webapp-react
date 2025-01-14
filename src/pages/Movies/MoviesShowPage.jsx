// IMPORT REACT HOOKS
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// IMPORT COMPONENTS
import Card from "../../components/mainComponents/Card";

export default function MoviesShowPage() {
  const { id } = useParams();
  const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/movies/" + id;

  const [movie, setMovie] = useState([]);

  // FUNCTION FOR RATE WITH STARS
  const rateStarsConversion = (rate) => {
    let decodStars = [];
    const numbTrunc = Math.trunc(rate);
    const numOfStars = Math.round(rate);

    for (let i = 1; i <= 5; i++) {
      if (i <= numOfStars) {
        if (i == numOfStars && rate / 2 - numbTrunc >= 0.5) {
          decodStars.push("semi-empty");
        } else {
          decodStars.push("full");
        }
      } else {
        decodStars.push("empty");
      }
    }

    return decodStars;
  };

  // ADD NEW FIELD IN SINGLE OBJECT ELEMENT FOR REVIEWS FOR PRINT STARS
  movie.reviews &&
    movie.reviews.forEach((review) => {
      review.starsVote = rateStarsConversion(review.vote);
    });

  // FETCH FUNCTION FOR SINGLE MOVIE
  function fetchMovie() {
    fetch(serverUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  }
  useEffect(fetchMovie, []);

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-end">
          <Link to="/movies">
            <button
              type="button"
              className="btn btn-outline-light fw-bold my-3"
            >
              Back
            </button>
          </Link>
        </div>

        <section className="card-movie">
          <Card movie={movie} />
        </section>

        <section className="review">
          <h2>Reviews</h2>

          <div className="row">
            {movie.reviews &&
              movie.reviews.map((review, index) => (
                <div key={index} className="col-12 g-3">
                  <div className="card cards-review">
                    <div className="card-header">
                      <div className="row">
                        <div className="col user">
                          <span className="user-photo">
                            {review.reviews_author_name[0]}
                          </span>
                          {review.reviews_author_name}
                        </div>
                        <div className="col vote text-end">
                          {review.starsVote && Array.isArray(review.starsVote)
                            ? review.starsVote.map((star, index) => {
                                if (star === "full") {
                                  return (
                                    <i
                                      key={index}
                                      className="star fa-solid fa-star"
                                    ></i>
                                  );
                                } else if (star === "empty") {
                                  return (
                                    <i
                                      key={index}
                                      className="star fa-regular fa-star"
                                    ></i>
                                  );
                                } else
                                  return (
                                    <i
                                      key={index}
                                      className="star fa-solid fa-star-half-stroke"
                                    ></i>
                                  );
                              })
                            : ""}
                        </div>
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
