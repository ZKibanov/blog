import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Article } from '../../types';
import { useAppSelector } from '../../hooks';
import BlogApi from '../../api/BlogApiService';

type Inputs = {
  newArticleTitle: string;
  newArticleDescription: string;
  newArticleText: string;
  newArticleTags?: string[];
};

const NewArticle: FC = () => {
  const isLoading = useAppSelector((state) => state.services.isLoading);
  // const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => {
    const {
      newArticleTitle,
      newArticleDescription,
      newArticleText,
      newArticleTags,
    } = data;

    const newArticle = {
      article: {
        title: newArticleTitle,
        description: newArticleDescription,
        body: newArticleText,
        tagList: newArticleTags,
      },
    };

    BlogApi('articles', 'POST', newArticle).then((response) => {
      // need to change this
      if (response.status === 422) {
        const errorDetails = response.data.errors;
        for (const property in errorDetails) {
          if (Object.prototype.hasOwnProperty.call(errorDetails, property)) {
            console.log(`${property}: ${errorDetails[property]}`);
          }
        }
      }

      //   if (!response.status) {console.log(response.status)}
      // store.dispatch(updateUserInStore(response.user));
      // history.push('/articles')
    });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new article</h2>
      <label htmlFor="new__article__title">
        Title
        <input
          type="text"
          id="new__article__title"
          {...register('newArticleTitle', { required: true })}
        />
      </label>
      <label htmlFor="new__article__description">
        Short description
        <input
          type="text"
          id="new__article__description"
          {...register('newArticleDescription', { required: true })}
        />
      </label>
      <label htmlFor="new__article__text">
        Text
        <textarea
          id="new__article__text"
          {...register('newArticleText', { required: true })}
        />
      </label>
      <label htmlFor="new__article__tags">
        Tags
        <input
          type="text"
          name="newArticleTags"
          id="new__article__tags"
          // ref={register({ required: true })}
        />
        <button type="button">Delete</button>
      </label>
      <label htmlFor="new__tag">
        Tags
        <input
          type="text"
          name="newTag"
          id="new__tag"
          // ref={register({ required: true })}
        />
        <button type="button">Delete</button>
        <button type="button">Add tag</button>
      </label>
      <button type="submit" disabled={isLoading}>
        Send
      </button>
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input name="example" defaultValue="test" ref={register} /> */}

      {/* include validation with required or other standard HTML validation rules */}
      {/* <input name="exampleRequired" ref={register({ required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {errors.newArticleTitle && <span>This field is required</span>}
    </form>
  );
};

export default NewArticle;
