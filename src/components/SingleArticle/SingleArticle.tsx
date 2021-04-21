import React, { FC } from "react";
import Markdown from "react-markdown";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import Card from "../Card/Card";
import classes from "./SingleArticle.module.scss";
import blogApi from "../../api/BlogApiService";

interface Slug {
  slug: string;
}
const SingleArticle: FC<Slug> = (props) => {
  const history = useHistory();
  const userData = useAppSelector((state) => state.data.user);
  let articleContent;
  const { slug } = props;
  const articlesFromStore = useAppSelector((state) => state.data.articles);
  const requestedArticle = articlesFromStore.filter(
    (el) => el.slug === slug.slice(1)
  );

  if (requestedArticle.length > 0) {
    /* eslint-disable prefer-destructuring */
    articleContent = requestedArticle[0];
    /* eslint-enable prefer-destructuring */
  } else {
    blogApi(`articles/${slug.slice(1)}`).then(
      (response => console.log(response.article))
    );
  }

  const deleteArticle = async () => {
    blogApi(`articles/${slug.slice(1)}`, "DELETE").then((response) =>
      history.push("/")
    );
  };

  const articleMenu =
    userData &&
    requestedArticle[0] &&
    userData.username === requestedArticle[0].author.username ? (
      <div className={classes.article__menu}>
        <button
        type="button"
          className={classes["article__menu_button--delete"]}
          onClick={deleteArticle}
        >
          Delete
        </button>
        <button
        type="button"
        className={classes["article__menu_button--edit"]}>Edit</button>
      </div>
    ) : null;

  if (articleContent) {
    const { body } = articleContent;
    return (
      <article className={classes.article}>
        <div className={classes.article__header}>
          <Card {...articleContent} />
          <div className={classes.article__header_filter} />
        </div>
        {articleMenu}
        <Markdown className={classes.article__main}>{body}</Markdown>
      </article>
    );
  }
  return (
    <div>
      <p>Статья не найдена</p>
    </div>
  );
};

export default SingleArticle;
