// IMPORT COMPONENTS
import ReviewItem from "./ReviewItem";

export default function ReviewsList({ reviews }) {
  return (
    <div className="row pb-3">
      {reviews &&
        reviews.map((review, index) => (
          <div key={index} className="col-12 g-3">
            <ReviewItem review={review} />
          </div>
        ))}
    </div>
  );
}
