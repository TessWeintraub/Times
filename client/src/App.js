import { Route, Routes } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import AddArticle from "./components/AddArticle/AddArticle";
import ArticlePage from "./components/ArticlePage/ArticlePage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/add-article" element={<AddArticle />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </div>
  );
}

export default App;
