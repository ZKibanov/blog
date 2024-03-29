import React, { FC, useEffect } from 'react';
import { Pagination } from 'antd';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useAppSelector } from '../../hooks';
import { setArticlesToStore } from '../../store/dataReducer';
import Card from '../Card';
import RequestApiService from '../../api/RequestApiService';
import store from '../../store/store';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import classes from './Articles.module.scss';

const Articles: FC = () => {
  const getArticles = async (pageNumber = 1) => {
    await RequestApiService.fetchArticles(pageNumber).then((data) => {
      if (data.articles) {
        store.dispatch(setArticlesToStore(data.articles));
      }
    });
  };

  useEffect(() => {
    getArticles();
  }, []);

  const onChange = (e: number) => {
    getArticles(e);
  };
  const articlesObject = useAppSelector((state) => state.data.articles);
  const articlesArray = articlesObject.map((article) => {
    const { ...props } = article;
    return (
      <div key={article.slug} className={classes.article}>
        <ErrorBoundary>
          <Card {...props} />
        </ErrorBoundary>
      </div>
    );
  });

  const isLoading = useAppSelector((state) => state.services.isLoading);
  const content = isLoading ? (
    <LoadingIndicator />
  ) : (
    <ul>{articlesArray.slice(0, 5)}</ul>
  );

  return (
    <ErrorBoundary>
      <div className={classes.articles}>{content}</div>
      <Pagination
        className={classes.pagination}
        size="small"
        total={500}
        defaultPageSize={5}
        showSizeChanger={false}
        defaultCurrent={1}
        hideOnSinglePage
        onChange={onChange}
      />
    </ErrorBoundary>
  );
};

export default Articles;
