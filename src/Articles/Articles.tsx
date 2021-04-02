import React, { FC, useEffect } from 'react';
import { Pagination } from 'antd';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useAppSelector } from '../hooks';
import { setArticlesToStore } from '../store/dataReducer';
import Card from '../Card/Card';
import blogApi from '../api/BlogApiService';
import store from '../store/store';

const Articles: FC = () => {
  const getArticles = async (pageNumber = 1) => {
    const page = `?offset=${(pageNumber - 1) * 5}`;
    await blogApi(`articles${page}`).then((data) => {
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
    return <Card key={article.slug} {...props} />;
  });

  const isLoading = useAppSelector((state) => state.services.isLoading);
  const content = isLoading ? (
    <LoadingIndicator />
  ) : (
    <ul>{articlesArray.slice(0, 5)}</ul>
  );

  return (
    <>
      {content}
      <Pagination
        size="small"
        total={500}
        defaultPageSize={5}
        showSizeChanger={false}
        defaultCurrent={1}
        hideOnSinglePage
        onChange={onChange}
      />
    </>
  );
};

export default Articles;
