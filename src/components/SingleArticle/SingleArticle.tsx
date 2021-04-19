import React, { FC } from "react";
import Markdown from "react-markdown";
import { useAppSelector } from "../../hooks";
import Card from "../Card/Card";
import classes from "./SingleArticle.module.scss";

interface Slug {
  slug: string;
}
const SingleArticle: FC<Slug> = (props) => {
  let articleContent;
  const { slug } = props;
  const articlesFromStore = useAppSelector((state) => state.data.articles);
  const requestedArticle = articlesFromStore.filter(
    (el) => el.slug === slug.slice(1)
  );

  if (requestedArticle.length > 0) {
    /* eslint-disable prefer-destructuring */
    articleContent = requestedArticle[0];
    /* eslint-enable */
  } else {
    articleContent = {
      title: "ЗАГЛУШКА",
      slug: "546-d65pmj",
      body: "ИСПРАВЬ НА ЗАПРОС!!!",
      createdAt: "2021-03-23T15:13:32.875Z",
      updatedAt: "2021-03-23T15:13:32.875Z",
      tagList: ["456"],
      description: "456",
      author: {
        username: "God-just-God",
        bio: null,
        image: "",
        following: false,
      },
      favorited: false,
      favoritesCount: 0,
    };
  }

  const { body } = articleContent;
  return (
    <article className={classes.article}>
      <div className={classes.article__header}>
        <Card {...articleContent} />
        <div className={classes.article__header_filter} />
      </div>
      <Markdown className={classes.article__main}>{body}</Markdown>
    </article>
  );
};

export default SingleArticle;
