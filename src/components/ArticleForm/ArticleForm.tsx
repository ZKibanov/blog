import React, { FC, useState, useEffect } from 'react';
import { Method } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Article } from '../../types';
import { useAppSelector } from '../../hooks';
import RequestApiServices from '../../api/RequestApiService';
import classes from './ArticleForm.module.scss';
import { setArticlesToStore } from '../../store/dataReducer';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import store from '../../store/store';

type Inputs = {
  newArticleTitle: string;
  newArticleDescription: string;
  newArticleText: string;
  newArticleTags?: string[];
  newTag: string;
};

interface Params {
  slug?: string;
}

const ArticleForm: FC = () => {
  const isLoading = useAppSelector((state) => state.services.isLoading);
  const history = useHistory();
  const articlesFromStore = useAppSelector((state) => state.data.articles);
  const [articleContent, setArticleContent] = useState<Article | undefined>();
  const [formTagList, setFormTagList] = useState<string[]>([]);
  const params: Params = useParams();

  useEffect(() => {
    if (params && params.slug) {
      const requestedArticle = articlesFromStore.filter(
        (el) => el.slug === params.slug
      );
      if (requestedArticle.length) {
        /* eslint-disable prefer-destructuring */
        setArticleContent(requestedArticle[0]);
        setFormTagList(requestedArticle[0].tagList);

        /* eslint-enable prefer-destructuring */
      } else {
        RequestApiServices.fetchSingleArticle(params.slug).then((response) => {
          setArticleContent(response.article);
          if (response.article.tagList) {
            setFormTagList(response.article.tagList);
          }
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const singleTag = watch('newTag');

  const tagElements = formTagList.map((tag) => (
    <div key={tag} className={classes['tag-wrapper']}>
      <p className={classes.tag}>{tag}</p>
      <button
        onClick={() =>
          setFormTagList((tags) =>
            tags.filter((currentTag) => currentTag !== tag)
          )
        }
        className={classes['article__form_delete-button']}
        type="button"
      >
        Delete
      </button>
    </div>
  ));

  const onSubmit = (data: Inputs) => {
    const { newArticleTitle, newArticleDescription, newArticleText } = data;

    const newArticle = {
      article: {
        title: newArticleTitle,
        description: newArticleDescription,
        body: newArticleText,
        tagList: formTagList,
      },
    };

    let requestMethod: Method;
    let endpoint;
    if (params.slug) {
      requestMethod = 'PUT';
      endpoint = `articles/${params.slug}`;
    } else {
      requestMethod = 'POST';
      endpoint = 'articles';
    }

    RequestApiServices.saveArticle(endpoint, requestMethod, newArticle).then(
      (response) => {
        if (response.status === 422) {
          const errorDetails = response.data.errors;
          ErrorIndicator(errorDetails);
        }

        if (response.article && params.slug) {
          const newArticles = articlesFromStore.map((article) =>
            article.slug === params.slug ? response.article : article
          );
          store.dispatch(setArticlesToStore(newArticles));
        }
        history.push('/');
      }
    );
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes['form__content--wrapper']}>
        <h2 className={classes.form__header}>Create new article</h2>
        <label className={classes.form__label} htmlFor="new__article__title">
          Title
          <input
            className={classes.form__input}
            type="text"
            id="new__article__title"
            defaultValue={articleContent?.title || ''}
            {...register('newArticleTitle', { required: true })}
          />
        </label>
        <label
          className={classes.form__label}
          htmlFor="new__article__description"
        >
          Short description
          <input
            className={classes.form__input}
            type="text"
            id="new__article__description"
            defaultValue={articleContent?.description || ''}
            {...register('newArticleDescription', { required: true })}
          />
        </label>
        <label className={classes.form__label} htmlFor="new__article__text">
          Text
          <textarea
            className={classes.form__textarea}
            id="new__article__text"
            defaultValue={articleContent?.body || ''}
            {...register('newArticleText', { required: true })}
          />
        </label>
        <label className={classes.form__label} htmlFor="new__article__tags">
          Tags
          <br />
          {tagElements}
        </label>
        <label className={classes.form__label} htmlFor="new__tag">
          <input
            className={classes['form__input--short']}
            type="text"
            id="new__tag"
            {...register('newTag')}
          />
          <button
            className={classes['article__form_delete-button']}
            type="button"
            onClick={() => setValue('newTag', '')}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setFormTagList((tags) => {
                const resultArray = [...tags];
                if (singleTag && singleTag.trim().length > 0) {
                  resultArray.push(singleTag.trim());
                }
                return Array.from(new Set(resultArray));
              });
              setValue('newTag', '');
            }}
            className={classes['article__form_add-button']}
            type="button"
          >
            Add tag
          </button>
        </label>
        <button
          className={classes['form__submit-button']}
          type="submit"
          disabled={isLoading}
        >
          Send
        </button>
        {errors.newArticleTitle && <span>This field is required</span>}
      </div>
    </form>
  );
};

export default ArticleForm;
