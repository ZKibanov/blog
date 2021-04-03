import React,{ FC } from 'react'
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../hooks'

type Inputs = {
    loginPassword: string;
    loginEmail: string;
  };

const NewArticle:FC = () => {
    const isLoading = useAppSelector((state) => state.services.isLoading);
    // const history = useHistory();
  
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const onSubmit = (data: Inputs) => {
    //   const { loginEmail, loginPassword } = data;
  
    //   const userInfo = {
    //     user: {
    //       email: loginEmail,
    //       password: loginPassword,
    //     },
    //   };

    //   BlogApi('users/login', 'POST', userInfo).then((response) => {
    //     if (response.status === 422) {
    //       const errorDetails = response.data.errors;
    //       for (const property in errorDetails) {
    //         if (Object.prototype.hasOwnProperty.call(errorDetails, property)) {
    //           console.log(`${property}: ${errorDetails[property]}`);
    //         }
    //       }
    //     }
  
    //     //   if (!response.status) {console.log(response.status)}
    //     // store.dispatch(updateUserInStore(response.user));
    //     // history.push('/articles')
    //   });
    };
  
    console.log(watch('loginPassword')); // watch input value by passing the name of it
  
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Create new article</h2>
        <label htmlFor="new__article__title">
          Title
          <input
            type="text"
            name="newArticleTitle"
            id="new__article__title"
            ref={register({ required: true })}
          />
        </label>
        <label htmlFor="new__article__short">
          Short description
          <input
            type="text"
            name="newArticleShort"
            id="new__article__short"
            ref={register({ required: true })}
          />
        </label>
        <label htmlFor="new__article__text">
          Text
          <textarea
            name="newArticleText"
            id="new__article__text"
            ref={register({ required: true })}
          />
        </label>     
        <label htmlFor="new__article__tags">
          Tags
          <input
            type="text"
            name="newArticleTags"
            id="new__article__tags"
            ref={register({ required: true })}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          Send
        </button>
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input name="example" defaultValue="test" ref={register} /> */}
  
        {/* include validation with required or other standard HTML validation rules */}
        {/* <input name="exampleRequired" ref={register({ required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {errors.loginPassword && <span>This field is required</span>}
      </form>
    );
}

export default NewArticle
