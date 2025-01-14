// IMPORT REACT HOOKS
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// IMPORT COMPONENTS
import Card from "../../components/mainComponents/Card";
import ReviewsList from "../../components/mainComponents/ReviewsComponents/ReviewsList";

export default function MoviesShowPage() {
  const { id } = useParams();
  const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/movies/" + id;
  const navigate = useNavigate();

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

  // FETCH FUNCTION FOR SINGLE MOVIE
  function fetchMovie() {
    fetch(serverUrl)
      .then((res) => {
        if (res.status === 404 || res.status === 400) {
          navigate("/not-found");
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data);
      });
  }
  useEffect(fetchMovie, []);

  // ADD NEW FIELD IN EVERY SINGLE OBJECT ELEMENT FOR REVIEWS FOR PRINT STARS
  movie.reviews &&
    movie.reviews.forEach((review) => {
      review.starsVote = rateStarsConversion(review.vote);
    });

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

          <ReviewsList reviews={movie.reviews} />
        </section>
      </div>
    </>
  );
}
