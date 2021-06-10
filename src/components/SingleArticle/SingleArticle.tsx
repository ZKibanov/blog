import React, { FC, useEffect, useState } from 'react';
import { Popconfirm } from 'antd';
import ReactMarkdown from 'react-markdown';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Card from '../Card/Card';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import classes from './SingleArticle.module.scss';
import RequestApiService from '../../api/RequestApiService';
import { Article } from '../../types';

interface Params {
  slug: string;
}

const SingleArticle: FC = () => {
  const userData = useAppSelector((state) => state.data.user);
  const isLoading = useAppSelector((state) => state.services.isLoading);
  const articlesFromStore = useAppSelector((state) => state.data.articles);
  const [articleContent, setArticleContent] = useState<Article | undefined>();
  const params: Params = useParams();
  const { slug } = params;
  const history = useHistory();
  const requestedArticle = articlesFromStore.filter((el) => el.slug === slug);

  useEffect(() => {
    if (requestedArticle.length > 0) {
      /* eslint-disable prefer-destructuring */
      setArticleContent(requestedArticle[0]);
      /* eslint-enable prefer-destructuring */
    } else {
      RequestApiService.fetchSingleArticle(slug).then((response) =>
        setArticleContent(response.article)
      );
    }
    // eslint-disable-next-line
  }, [articlesFromStore, slug, userData]);

  const deleteArticle = async () => {
    RequestApiService.deleteArticle(slug).then((response) => history.push('/'));
  };

  const articleMenu =
    userData &&
    articleContent &&
    userData.username === articleContent.author.username ? (
      <div className={classes.article__menu}>
        <Popconfirm
          placement="rightBottom"
          title="Are you sure to delete this article?"
          onConfirm={deleteArticle}
          okText="Yes"
          cancelText="No"
        >
          <button
            type="button"
            className={classes['article__menu_button--delete']}
          >
            Delete
          </button>
        </Popconfirm>

        <button
          type="button"
          className={classes['article__menu_button--edit']}
          onClick={() => history.push(`/articles/${slug}/edit`)}
        >
          Edit
        </button>
      </div>
    ) : null;

  let content;
  if (articleContent && !isLoading) {
    const { body } = articleContent;
    content = (
      <article className={classes.article}>
        <div className={classes.article__header}>
          <Card {...articleContent} />
          <div className={classes.article__header_filter} />
        </div>
        {articleMenu}
        <ReactMarkdown className={classes.article__main}>{body}</ReactMarkdown>
      </article>
    );
  }

  if (isLoading)
    content = (
      <div style={{ textAlign: 'center' }}>
        <LoadingIndicator />
      </div>
    );
  if (!isLoading && !articleContent) {
    content = (
      <div
        style={{
          color: 'red',
          fontSize: '30px',
          textAlign: 'center',
          paddingTop: '30px',
        }}
      >
        <p>Статья не найдена</p>
      </div>
    );
  }

  return <>{content}</>;
};

export default SingleArticle;
