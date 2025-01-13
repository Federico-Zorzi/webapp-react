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

  return (
    <>
      <div className="container">
        <Card movie={movie} />
      </div>
    </>
  );
}
