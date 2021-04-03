import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Article } from '../../types';

const Card: FC<Article> = (props: Article) => {
  const { title, description, slug } = props;
  return (
    <div>
      <Link to={`/articles/:${slug}`}>{title}</Link>
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
};

export default Card;
