export default function ReviewItem({ review }) {
  return (
    <div className="card cards-review">
      <div className="card-header">
        <div className="row">
          <div className="col user">
            <span className="user-photo">{review.reviews_author_name[0]}</span>
            {review.reviews_author_name}
          </div>
          <div className="col vote text-end">
            {review.starsVote && Array.isArray(review.starsVote)
              ? review.starsVote.map((star, index) => {
                  if (star === "full") {
                    return (
                      <i key={index} className="star fa-solid fa-star"></i>
                    );
                  } else if (star === "empty") {
                    return (
                      <i key={index} className="star fa-regular fa-star"></i>
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
  );
}
