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
  const defaultReviewFormData = {
    name: "",
    vote: "",
    text: "",
  };

  const [reviewFormData, setReviewFormData] = useState(defaultReviewFormData);
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

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    /* const reviewList = [
      ...movie.review,
      {
        name: reviewFormData.name,
        vote: reviewFormData.vote,
        text: reviewFormData.text,
      },
    ]; */

    fetch(serverUrl + "/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: reviewFormData.name,
        vote: reviewFormData.vote,
        text: reviewFormData.text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data;

        // reset input fields
        setReviewFormData(defaultReviewFormData);
      });
  };

  const handleChange = (e) => {
    setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value });
  };

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
              <form className="row" onSubmit={handleSubmit}>
                {/* FORM NAME */}
                <div className="col mb-3">
                  <label htmlFor="nameInputField" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInputField"
                    aria-describedby="nameInput"
                    name="name"
                    value={reviewFormData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* FORM VOTE */}
                <div className="col mb-3">
                  <label htmlFor="voteReviewInputField" className="form-label">
                    Vote
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    className="form-control"
                    id="voteReviewInputField"
                    name="vote"
                    value={reviewFormData.vote}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* FORM TEXT */}
                <div className="col-12 mb-3">
                  <label htmlFor="textReviewField" className="form-label">
                    Text
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="textReviewInputField"
                    name="text"
                    value={reviewFormData.text}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* FORM SUBMIT BUTTON */}
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-outline-success">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>

          <ReviewsList reviews={movie.reviews} />
        </section>
      </div>
    </>
  );
}
