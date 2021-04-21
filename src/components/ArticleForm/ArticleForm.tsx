import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Article } from "../../types";
import { useAppSelector } from "../../hooks";
import BlogApi from "../../api/BlogApiService";
import classes from "./ArticleForm.module.scss";

type Inputs = {
  newArticleTitle: string;
  newArticleDescription: string;
  newArticleText: string;
  newArticleTags?: string[];
  newTag: string;
};

const NewArticle: FC = (props) => {
  const isLoading = useAppSelector((state) => state.services.isLoading);
  const history = useHistory();
  const [tagList, setTagList] = useState([""]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const singleTag = watch("newTag");

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
        tagList,
      },
    };

    BlogApi("articles", "POST", newArticle).then((response) => {
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
            {...register("newArticleDescription", { required: true })}
          />
        </label>
        <label className={classes.form__label} htmlFor="new__article__text">
          Text
          <textarea
            className={classes.form__textarea}
            id="new__article__text"
            {...register("newArticleText", { required: true })}
          />
        </label>
        <label className={classes.form__label} htmlFor="new__article__tags">
          Tags
          <br />
          <input
            className={classes["form__input--short"]}
            disabled
            type="text"
            name="newArticleTags"
            id="new__article__tags"
            value={tagList.join(" ")}
          />
          <button
            onClick={() => setTagList([])}
            className={classes["article__form_delete-button"]}
            type="button"
          >
            Delete
          </button>
        </label>
        <br />
        <label className={classes.form__label} htmlFor="new__tag">
          <input
            className={classes["form__input--short"]}
            type="text"
            id="new__tag"
            // onChange={()}
            {...register("newTag")}
          />
          <button
            className={classes["article__form_delete-button"]}
            type="button"
          >
            Delete
          </button>
          <button
            onClick={() =>
              setTagList((tags) => {
                const resultArray = [...tags];
                resultArray.push(singleTag);
                return resultArray;
              })
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
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input name="example" defaultValue="test" ref={register} /> */}

        {/* include validation with required or other standard HTML validation rules */}
        {/* <input name="exampleRequired" ref={register({ required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {errors.newArticleTitle && <span>This field is required</span>}
      </div>
    </form>
  );
};

export default NewArticle;
