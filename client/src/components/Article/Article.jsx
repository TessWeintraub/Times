import React, { useEffect } from "react";
import { format, compareAsc } from 'date-fns'
import draftToHtml from "draftjs-to-html";

import eyeIcon from "../../assets/Vector.svg";
import articleClasses from "./Article.module.css";
import imageNotFound from "../../assets/notImage.png";
import { Link } from "react-router-dom";
import {authorArticle} from "../../mockdata/articleData";

const Article = ({ location, article }) => {
  return (
    <>
      {location !== "article_page" ? (
        <Link
          to={`/article/${article.id}`}
          className={articleClasses[`${location}__article`]}
        >
          <img
            className={articleClasses[`${location}__article__img`]}
            src={article.imageUrl || imageNotFound}
            alt="Article img"
          />
          <section className={articleClasses[`${location}__article__info`]}>
            <div className={articleClasses[`article__tags`]}>
              {
                article.tags.map( (tag) => (
                  <p
                    className={articleClasses[`article__tag`]}
                  >{`#${tag}`}</p>
                ))
              }
            </div>
            <h1 className={articleClasses[`article__title`]}>
              {article.title}
            </h1>
            {/*todo: Как будет готова база с описанием поста в формате html, вместо строчки ниже использовать dangerouslySetInnerHTML={{ __html: draftToHtml(article.subtitle) }} как атрибут тега*/}
            <p
              className={articleClasses[`${location}__article__subtitle`]}
              dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(article.content)) }}
            >
            </p>
            <div className={articleClasses[`article__other__info`]}>
              <div className={articleClasses.author}>
                <img
                  className={articleClasses[`author__img`]}
                  src={authorArticle.authorImage}
                  alt="author"
                />
                <p className={articleClasses[`author__name`]}>
                  {authorArticle.author}
                </p>
              </div>
              <p className={articleClasses.time}>{format(new Date(Number(article.date)), 'MMM dd')}</p>
              <p className={articleClasses.time}>{article.timeRead}</p>
              <div className={articleClasses.views}>
                <img src={eyeIcon} alt="eye__icon" />
                <span>{article.views_count}</span>
              </div>
            </div>
          </section>
        </Link>
      ) : (
        <div className={articleClasses[`${location}__article`]}>
          <section className={articleClasses[`${location}__article__info`]}>
            <div className={articleClasses[`article__tags`]}>
              {
                article.tags.map( (tag) => (
                  <p
                    className={articleClasses[`article__tag`]}
                  >{`#${tag}`}</p>
                ))
              }
            </div>
            <h1 className={articleClasses[`${location}__article__title`]}>
              {article.title}
            </h1>
            <img
              className={articleClasses[`${location}__article__img`]}
              src={article.imageUrl || imageNotFound}
              alt="Article img"
            />
            {/*todo: Как будет готова база с описанием поста в формате html, вместо строчки ниже использовать dangerouslySetInnerHTML={{ __html: draftToHtml(article.subtitle) }} как атрибут тега*/}
            <p
              className={articleClasses[`${location}__article__subtitle`]}
              dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(article.content)) }}
            >
            </p>
            <div className={articleClasses[`article__other__info`]}>
              <div className={articleClasses.author}>
                <img
                  className={articleClasses[`author__img`]}
                  src={authorArticle.authorImage}
                  alt="author"
                />
                <p className={articleClasses[`author__name`]}>
                  {authorArticle.author}
                </p>
              </div>
              <p className={articleClasses.time}>ffffff</p>
              <div className={articleClasses.views}>
                <img src={eyeIcon} alt="eye__icon" />
                <span>{article.views}</span>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Article;
