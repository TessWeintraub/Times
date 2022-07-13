import React, {useEffect, useState} from "react";

import { useNavigate, useParams } from "react-router-dom";

import Button from "../UI/Button/Button";
import Article from "../Article/Article";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import ArticlePageClasses from "./ArticlePage.module.css";
import axios from "axios";

const ArticlePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [thisArticle,setThisArticle] = useState()

  useEffect(()=>{
    axios.get(`http://localhost:5000/posts/${params.id}`).then(res=> setThisArticle(res.data))
    axios.patch(`http://localhost:5000/posts/${params.id}`).then(res=> console.log(res.data))
  },[])


  useEffect(() => window.scrollTo(0, 0), []);

  const openAllArticles = () => {
    navigate("/", { replace: true });
  };



  return (
    <>
      <Header />
      <main className={ArticlePageClasses[`article__page`]}>
        <aside>
          <Button
            variant={`outlined__header`}
            name="All Articles"
            onClick={() => openAllArticles()}
          />
        </aside>
        {thisArticle && <Article article={thisArticle} location="article_page" />}
      </main>
      <Footer />
    </>
  );
};

export default ArticlePage;
