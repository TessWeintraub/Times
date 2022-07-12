import React, { useCallback, useEffect, useMemo, useState } from "react";

import Article from "../Article/Article";
import Button from "../UI/Button/Button";
import { APP_ARTICLES_PAGE } from "../../mockdata/appConstants";

import articleListClasses from "./ArticleList.module.css";

const ArticleList = ({ location, allArticles }) => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [count])

  const onClickNextButton = useCallback(() => {
    setCount((count) => count + 1);
  }, [count]);

  const onClickPrevButton = useCallback(() => {
    setCount((count) => count - 1);
  }, [count]);

  const articles = useMemo(() => {
    return allArticles.reverse();
  }, [location, allArticles]);

  const slicedArticles = useMemo(
    () =>
      articles?.slice(
        count * APP_ARTICLES_PAGE,
        (count + 1) * APP_ARTICLES_PAGE
      ),
    [articles, count]
  );

  const isDisable = useCallback(
    (arrayArticles) =>
      (count === 0 && arrayArticles?.length < 7) ||
      (count + 1) * APP_ARTICLES_PAGE >= arrayArticles?.length,
    [count, APP_ARTICLES_PAGE]
  );




  return (
    <section className={articleListClasses[`article_list__article__list`]}>
      <h1 className={articleListClasses[`article__list__title`]}>
        Popular articles
      </h1>
      <div>
        {allArticles?.map((myArticle) => (
          <Article
            key={myArticle?.id}
            location={location}
            article={myArticle}
          />
        ))}
      </div>
      <div className={articleListClasses[`article__list__nav__button`]}>
        <Button
          variant={`outlined__header`}
          name="Prev"
          onClick={onClickPrevButton}
          isDisable={!(count * APP_ARTICLES_PAGE >= APP_ARTICLES_PAGE)}
        />
        <Button
          variant={`outlined__header`}
          name="Next"
          onClick={onClickNextButton}
          isDisable={isDisable(articles)}
        />
      </div>
    </section>
  );
};

export default ArticleList;
