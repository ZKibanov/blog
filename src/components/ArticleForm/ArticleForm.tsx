import React, { FC, ReactNode, useState, useEffect } from "react";
import { Method} from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Article } from "../../types";
import { useAppSelector } from "../../hooks";
import blogApi from "../../api/BlogApiService";
import classes from "./ArticleForm.module.scss";

type Inputs = {
  newArticleTitle: string;
  newArticleDescription: string;
  newArticleText: string;
  newArticleTags?: string[];
  newTag: string;
};


interface Slug {
  slug: string;
}

const NewArticle: FC<Slug> = (props) => {
  const isLoading = useAppSelector((state) => state.services.isLoading);
  const history = useHistory();
  const articlesFromStore = useAppSelector((state) => state.data.articles);
  const [articleContent,setArticleContent] = useState<Article | undefined >() 
  const [formTagList, setTagList] = useState<string[]>([]);


  useEffect(()=>{
    if (props.slug){
      const requestedArticle = articlesFromStore.filter(
        (el) => el.slug === props.slug
      );
      if (requestedArticle.length > 0) {
        /* eslint-disable prefer-destructuring */
        setArticleContent(requestedArticle[0]);
        if (requestedArticle[0].tagList){
          setTagList(requestedArticle[0].tagList)
          }
        /* eslint-enable prefer-destructuring */
      } else {
        blogApi(`articles/${props.slug}`).then(
          (response => {
            setArticleContent(response.article)
            if (response.article.tagList){
            setTagList(response.article.tagList)
            }
          })
        );
      }
    }
  },[])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const singleTag = watch("newTag");

  const tagElements = formTagList.map(tag=><div key={tag} className={classes["tag-wrapper"]}><p className={classes.tag}>{tag}</p>
  <button
    onClick={() => setTagList(tags=>tags.filter(currentTag=>currentTag!==tag))}
    className={classes["article__form_delete-button"]}
    type="button"
  >
    Delete
  </button></div>)

  const onSubmit = (data: Inputs) => {
    const {
      newArticleTitle,
      newArticleDescription,
      newArticleText,
    } = data;

    const newArticle = {
      article: {
        title: newArticleTitle,
        description: newArticleDescription,
        body: newArticleText,
        tagList:formTagList,
      },
    };
     
    let requestMethod:Method;
    let endpoint;
    if (props.slug){
      requestMethod = 'PUT'; 
      endpoint = `articles/${props.slug}`
    } else {
      requestMethod = 'POST'; 
      endpoint ="articles";
    }

    blogApi(endpoint, requestMethod, newArticle).then((response) => {
      // need to change this
      if (response.status === 422) {
        const errorDetails = response.data.errors;
        for (const property in errorDetails) {
          if (Object.prototype.hasOwnProperty.call(errorDetails, property)) {
            console.log(`${property}: ${errorDetails[property]}`);
          }
        }
      }
      if (response.article) console.log(response);

      //   if (!response.status) {console.log(response.status)}
      // store.dispatch(updateUserInStore(response.user));
      history.push("/articles");
    });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes["form__content--wrapper"]}>
        <h2 className={classes.form__header}>Create new article</h2>
        <label className={classes.form__label} htmlFor="new__article__title">
          Title
          <input
            className={classes.form__input}
            type="text"
            id="new__article__title"
            defaultValue = {articleContent?.title || ""}
            {...register("newArticleTitle", { required: true })}
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
            defaultValue = {articleContent?.description || ""}
            {...register("newArticleDescription", { required: true })}
          />
        </label>
        <label className={classes.form__label} htmlFor="new__article__text">
          Text
          <textarea
            className={classes.form__textarea}
            id="new__article__text"
            defaultValue = {articleContent?.body || ""}
            {...register("newArticleText", { required: true })}
          />
        </label>
        <label className={classes.form__label} htmlFor="new__article__tags">
          Tags
          <br />
          {tagElements}
        </label>
        <label className={classes.form__label} htmlFor="new__tag">
          <input
            className={classes["form__input--short"]}
            type="text"
            id="new__tag"
            {...register("newTag")}
          />
          <button
            className={classes["article__form_delete-button"]}
            type="button"
            onClick={()=>setValue('newTag','')}
          >
            Delete
          </button>
          <button
            onClick={() =>{
              setTagList((tags) => {
                const resultArray = [...tags];
                if (singleTag.trim().length>0){
                resultArray.push(singleTag.trim());
                }
                return Array.from(new Set(resultArray));
              })
              setValue('newTag','');
            }
            }
            className={classes["article__form_add-button"]}
            type="button"
          >
            Add tag
          </button>
        </label>
        <button
          className={classes["form__submit-button"]}
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

export default NewArticle;
