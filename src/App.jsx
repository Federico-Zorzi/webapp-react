// IMPORT ROUTER FOR APP NAVIGATION
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";

// IMPORT PAGES
import HomePage from "./pages/HomePage";
import MoviesIndexPage from "./pages/Movies/MoviesIndexPage";
import MoviesShowPage from "./pages/Movies/MoviesShowPage";
import NotFound from "./pages/notFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={HomePage} />
            <Route path="/movies" Component={MoviesIndexPage} />
            <Route path="/movies/:id" element={<MoviesShowPage />} />
            <Route path="/not-found" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
