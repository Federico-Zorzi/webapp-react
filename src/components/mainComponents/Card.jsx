export default function Card({ movie }) {
  return (
    <div className="card mb-3">
      <div className="row card-sections g-0">
        <div className="col-md-4">
          <img
            src={movie.image}
            className="img-fluid rounded-start poster"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {movie.title} ({movie.release_year})
            </h5>
            <div className="author pb-2">{movie.director}</div>
            <span className="badge text-bg-dark">{movie.genre}</span>
            <p className="card-text">{movie.abstract}</p>
          </div>
        </div>
      </div>
    </div>
  );
}