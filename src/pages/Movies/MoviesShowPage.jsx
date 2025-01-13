// IMPORT REACT HOOKS
import { useEffect } from "react";

export default function MoviesShowPage() {
  const { id } = useParams();

  useEffect(() => {}, []);

  return (
    <>
      <div className="container">
        <h1 className="pt-3">Movie {id}</h1>
      </div>
    </>
  );
}
