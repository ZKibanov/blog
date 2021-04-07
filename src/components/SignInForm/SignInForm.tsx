import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BlogApi from '../../api/BlogApiService';
import { useAppSelector } from '../../hooks';
import { manageUserToStore } from '../../utils';

type Inputs = {
  loginPassword: string;
  loginEmail: string;
};

const SignInForm: FC = () => {
  const isLoading = useAppSelector((state) => state.services.isLoading);
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);

  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => {
    const { loginEmail, loginPassword } = data;

    const userInfo = {
      user: {
        email: loginEmail,
        password: loginPassword,
      },
    };
    BlogApi('users/login', 'POST', userInfo).then((response) => {
      if (response.status === 422) {
        const errorDetails = response.data.errors;
        for (const property in errorDetails) {
          if (Object.prototype.hasOwnProperty.call(errorDetails, property)) {
            console.log(`${property}: ${errorDetails[property]}`);
          }
        }
      }

      //   if (!response.status) {console.log(response.status)}
      if (response.user) {
        const { username, email, token, image, id } = response.user;
        setCookie('Authorization', token, { secure: true });
        manageUserToStore(username, email, image);
        history.push('/articles');
      }
    });
  };

  console.log(watch('loginPassword')); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="login__email">
        Email address
        <input
          type="email"
          name="loginEmail"
          id="login__email"
          ref={register({ required: true })}
        />
      </label>
      <label htmlFor="login__password">
        Password
        <input
          name="loginPassword"
          type="password"
          id="login__password"
          ref={register({ required: true })}
        />
      </label>
      <button type="submit" disabled={isLoading}>
        Login
      </button>
      <p>
        Don't have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input name="example" defaultValue="test" ref={register} /> */}

      {/* include validation with required or other standard HTML validation rules */}
      {/* <input name="exampleRequired" ref={register({ required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {errors.loginPassword && <span>This field is required</span>}
    </form>
  );
};

export default SignInForm;
