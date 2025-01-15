// IMPORT REACT HOOKS
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// IMPORT COMPONENTS
import Card from "../../components/mainComponents/Card";
import ReviewsList from "../../components/mainComponents/ReviewsComponents/ReviewsList";
import ReviewForm from "../../components/mainComponents/ReviewsComponents/ReviewForm";

export default function MoviesShowPage() {
  const { id } = useParams();
  const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/movies/" + id;
  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);

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
        console.log(data);

        setMovie(data);
        setReviews(data.reviews);
      });
  }
  useEffect(fetchMovie, []);

  // FETCH FUNCTION FOR REVIEWS LIST BY ID
  const fetchReviews = () => {
    fetch(serverUrl + "/reviews")
      .then((res) => res.json())
      .then((data) => {
        const reviewsUpdated = data.map((review) => {
          return {
            reviews_author_name: review.name,
            vote: review.vote,
            text: review.text,
          };
        });
        setReviews(reviewsUpdated);
      });
  };

  // ADD NEW FIELD IN EVERY SINGLE OBJECT ELEMENT FOR REVIEWS FOR PRINT STARS
  reviews &&
    reviews.forEach((review) => {
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
          <div className="d-flex align-items-center justify-content-between">
            <h2>Reviews</h2>

            <div className="d-inline-flex gap-1">
              <button
                className="btn btn-outline-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseForm"
                aria-expanded="false"
                aria-controls="collapseForm"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="collapse" id="collapseForm">
            <div className="card card-body">
              {/* FORM */}
              <ReviewForm fetchReviews={fetchReviews} />
            </div>
          </div>

          <ReviewsList reviews={reviews} />
        </section>
      </div>
    </>
  );
}
