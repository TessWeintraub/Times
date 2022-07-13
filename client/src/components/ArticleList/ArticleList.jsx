import React, { useEffect, useState } from "react";
import Article from "../Article/Article";
import Button from "../UI/Button/Button";
import articleListClasses from "./ArticleList.module.css";
import axios from "axios";
import SelectFilter from "../UI/SelectFilter/SelectFilter";
import * as queryString from "query-string";
import SelectSort from "../UI/SelectSort/SelectSort";
import Input from "../UI/Input/Input";
import {useNavigate} from "react-router-dom";

const ArticleList = ({ location, allArticles, requestAllArticles, maxPage }) => {

  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [categories, setCategories] = useState([])
  const [sort, setSort] = useState('')
  const [activeFilter, setActiveFilter] = useState([])
  const [searchValue, setSearchValue] = useState({search: ''})
  const queryParam = queryString.parse(window.location.search)
  const [isDisabled, setIsDisabled] = useState({
    prev: false,
    next: false
  })



  useEffect(()=>{
    axios.get(`http://localhost:5000/posts/tags`).then(res=> setCategories(res.data))
    queryParam.filter && setActiveFilter([queryParam.filter])
    queryParam.search && setSearchValue({search: queryParam.search})
    queryParam.sort === 'date' && setSort({name: 'По дате', key: 'date'})
    queryParam.sort === 'views_count' && setSort({name: 'По популярности', key: 'views_count'})
    queryParam.page && setCount(Number(queryParam.page))
  },[])



  useEffect(() => {
    setIsDisabled( {
      next: !(count < maxPage),
      prev: count === 1
    })
    window.scrollTo(0, 0);
  }, [count])

  const onClickNextButton = () => {
    console.log('===>count', count)
    console.log('===>maxPage', maxPage)
    if(count + 1 <= maxPage){
      setCount((count) => count + 1);
      handlerClick(count+1)
    }
  }

  const onClickPrevButton = () => {
      setCount((count) => count - 1);
      handlerClick(count-1)
  }



const handlerClick = (numberPage) => {
  const filterParam = activeFilter.length ? `&filter=${activeFilter.join(',')}` : ''
  const sortParam = sort ? `&sort=${sort.key}` : ''
  const searchParam = searchValue.search ? `search=${searchValue.search}` : ''
  const pageParam = numberPage > 1 ? `&page=${numberPage}` : ''
  navigate({search: `?${searchParam + sortParam + filterParam + pageParam}`})
  requestAllArticles(`http://localhost:5000/posts?${searchParam+sortParam+filterParam+pageParam}`)
  }


  return (
    <section className={articleListClasses[`article_list__article__list`]}>
      <h1 className={articleListClasses[`article__list__title`]}>
        Search
      </h1>
      <section className={articleListClasses[`article__list_search`]}>
      {categories.length &&
        <SelectFilter
          data={categories}
          state={activeFilter}
          setState={setActiveFilter}
          placeholder='#tag'
          label='Filter'
        />}

      <SelectSort
        state={sort}
        setState={setSort}
        placeholder='По дате'
        label='Sort'
      />
      <Input
        text="Search"
        name="search"
        placeholder="Enter a title"
        inputValue={searchValue}
        setInputValue={setSearchValue}
      />
        <Button
          name="Search"
          variant="contained__header"
          onClick={() => {
            handlerClick()
          }}
        />
    </section>
      <h1 className={articleListClasses[`article__list__title`]}>
         Articles
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
          isDisable={isDisabled.prev}
        />
        <Button
          variant={`outlined__header`}
          name="Next"
          onClick={onClickNextButton}
          isDisable={isDisabled.next}
        />
      </div>
    </section>
  );
};

export default ArticleList;
