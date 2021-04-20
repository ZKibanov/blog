import React, { FC } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { Avatar } from "antd";
import { Article } from "../../types";
import classes from "./Card.module.scss";
import { useAppSelector } from "../../hooks";
import { setArticlesToStore } from "../../store/dataReducer";
import store from "../../store/store";
import blogApi from "../../api/BlogApiService";




const Card: FC<Article> = (props: Article) => {
  const {
    title,
    description,
    slug,
    author,
    createdAt,
    tagList,
    favorited,
    favoritesCount,
  } = props;
  const { username, image } = author;

  const tags = tagList?.map((tag) => (
    <span className={classes.card__tag} key={tag + slug}>
      {tag}
    </span>
  ));
  const articlesObject = useAppSelector((state) => state.data.articles);

  // пофиксить, исходя из локейшна роутера - в одиночной статье работает хорошо, хз вообще - почему....
  const setLike = async(someArticle:Article,articleIndex:number) =>{
    const favValue:boolean = someArticle.favorited;
    const slug = someArticle.slug;
    const newArticleObject = (favValue === false) ?
    await blogApi(`/articles/${slug}/favorite`,'POST') :
    await blogApi(`/articles/${slug}/favorite`,'DELETE')
    console.log(newArticleObject.article)
    const result = [...articlesObject]
    result[articleIndex] = newArticleObject.article;
    store.dispatch(setArticlesToStore(result))
  }

  const addReaction = () => {
 articlesObject.map((article,i)=>{
      if(article.slug===slug){
        const newArticle =  setLike(article,i)
      }
      return article
    })
  }
  
  const likeButton = favorited ?
  <button type="button" onClick = {addReaction} className={classes["card__unfavourite-button"]}/>:
  <button type="button" onClick = {addReaction} className={classes["card__favourite-button"]}/>

  return (
    <article className={classes.card}>
      <div className={classes.card__main}>
        <Link className={classes.card__link} to={`/articles/:${slug}`}>
          {title}
        </Link>
        {likeButton}
        <span className={classes["card__favourite-count"]}>
          {favoritesCount}
        </span>
        <div>{tags}</div>
        <ReactMarkdown className={classes.card__preview}>
          {description}
        </ReactMarkdown>
      </div>
      <div className={classes.card__info}>
        <div className={classes.card__user_wrapper}>
          <h6 className={classes.card__username}>{username}</h6>
          <span className={classes.card__created}>
            {format(new Date(createdAt), "MMMMMMM dd, yyyy")}
          </span>
        </div>
        <Avatar
          className={classes.card__avatar}
          size={46}
          icon={<img src={image} alt="avatar" />}
        />
      </div>
    </article>
  );
};

export default Card;
