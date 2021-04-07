import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Avatar } from 'antd';
import { Article } from '../../types';
import classes from './Card.module.scss';

const Card: FC<Article> = (props: Article) => {
  const {
    title,
    description,
    slug,
    author,
    createdAt,
    tagList,
    favoritesCount,
  } = props;
  const { username, image } = author;

  const tags = tagList?.map((tag) => (
    <span className={classes.card__tag} key={tag + slug}>
      {tag}
    </span>
  ));
  return (
    <article className={classes.card}>
      <div className={classes.card__main}>
        <Link className={classes.card__link} to={`/articles/:${slug}`}>
          {title}
        </Link>
        <button type="button" className={classes['card__favourite-button']}>
          like
        </button>
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
