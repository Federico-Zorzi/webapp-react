import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ReviewForm({ fetchReviews }) {
  const { id } = useParams();
  const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/movies/" + id;
  const defaultReviewFormData = {
    name: "",
    vote: "",
    text: "",
  };

  const [reviewFormData, setReviewFormData] = useState(defaultReviewFormData);

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

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
        /* function for fetch reviews list updated */
        fetchReviews();

        // reset input fields
        setReviewFormData(defaultReviewFormData);
      });
  };

  const handleChange = (e) => {
    setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value });
  };

  return (
    <>
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
    </>
  );
}
