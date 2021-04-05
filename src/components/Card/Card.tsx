import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Article } from '../../types';

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
  return (
    <article>
      <div>
        <Link to={`/articles/:${slug}`}>{title}</Link>
        <button type="button">like</button>
        <span>{favoritesCount}</span>
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
      <h3>{username}</h3>
      <div>{format(new Date(createdAt), 'MMMMMMM dd, yyyy')}</div>
      <img src={image} alt="avatar" />
      <div />
    </article>
  );
};

export default Card;
