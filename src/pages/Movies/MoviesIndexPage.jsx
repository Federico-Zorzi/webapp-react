// IMPORT REACT HOOKS
import { useState, useEffect } from "react";

export default function MoviesIndexPage() {
  /* const serverUrl = import.meta.env.VITE_SERVER_URL;

  const [movies, setMovies] = useState([]);

  function fetchMovies() {
    fetch(serverUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        console.log(data);
      });
  } */

  useEffect(fetchMovies, []);

  return (
    <>
      <div className="container">
        <h1 className="pt-3">Movies</h1>
      </div>
    </>
  );
}
