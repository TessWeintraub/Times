import React, {useEffect, useState} from "react";

import Article from "../Article/Article";
import ArticleList from "../ArticleList/ArticleList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import mainClasses from "./MainPage.module.scss";
import preloader from "../../assets/Pulse-1s-200px.svg";
import axios from "axios";

const MainPage = () => {

  useEffect(() => window.scrollTo(0, 0), [])

  const [allArticles, setAllArticle] = useState([])
  const [popularArticle, setPopularArticle] = useState()

  useEffect(()=>{
    axios.get('http://localhost:5000/posts').then(res=> setAllArticle(res.data.items))
    axios.get('http://localhost:5000/posts?sort=views_count').then(res=> setPopularArticle(res.data.items[0]))
  },[])

  return (
    <>
      <Header />
      <main className={mainClasses.main}>
        {allArticles.length && popularArticle  ? (
          <>
            <Article location="main_page" article={popularArticle} />
            <ArticleList location="article_list" allArticles={allArticles} />
          </>
        ) : (
          <img src={preloader} alt="Loading..." />
        )}
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
