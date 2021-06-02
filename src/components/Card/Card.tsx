import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Avatar } from 'antd';
import { Article } from '../../types';
import classes from './Card.module.scss';
import { useAppSelector } from '../../hooks';
import { setArticlesToStore } from '../../store/dataReducer';
import store from '../../store/store';
import { blogApiWithoutLoadingIndication } from '../../api/BlogApiService';

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
  const user = useAppSelector((state) => state.data.user);

  const addReaction = async () => {
    const oldArticlesObject = JSON.parse(JSON.stringify(articlesObject))
    const newArticles = articlesObject.map((article) => {
      if (article.slug === slug) {
        const counter=article.favorited? -1: 1;
        return { ...article,
          favorited:!article.favorited,
          favoritesCount:favoritesCount+counter,    
      }
    }
      return article;
    });
    store.dispatch(setArticlesToStore(newArticles));

    const newArticleObject =
      favorited === false
        ? await blogApiWithoutLoadingIndication(
            `/articles/${slug}/favorite`,
            'POST'
          )
        : await blogApiWithoutLoadingIndication(
            `/articles/${slug}/favorite`,
            'DELETE'
          );

      if (!newArticleObject.article){
        store.dispatch(setArticlesToStore(oldArticlesObject));
      }
  };

  const isAuthorized = !!user;

  const likeButton = favorited ? (
    <button
      type="button"
      aria-label="remove like"
      disabled={!isAuthorized}
      onClick={addReaction}
      className={classes['card__unfavourite-button']}
    />
  ) : (
    <button
      type="button"
      aria-label="add like"
      disabled={!isAuthorized}
      onClick={addReaction}
      className={classes['card__favourite-button']}
    />
  );

  return (
    <article className={classes.card}>
      <div className={classes.card__main}>
        <Link className={classes.card__link} to={`/articles/${slug}`}>
          {title}
        </Link>
        {likeButton}
        <span className={classes['card__favourite-count']}>
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
            {format(new Date(createdAt), 'MMMMMMM dd, yyyy')}
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
