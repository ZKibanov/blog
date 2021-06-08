import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BlogApi from '../../api/BlogApiService';
import { useAppSelector } from '../../hooks';
import { manageUserToStore } from '../../utils';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import classes from './SignInForm.module.scss';

type Inputs = {
  loginPassword: string;
  loginEmail: string;
};

const SignInForm: FC = () => {
  const isLoading = useAppSelector((state) => state.services.isLoading);
  const history = useHistory();
  // eslint-disable-next-line
  const [, setCookie, removeCookie] = useCookies(['Token']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
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
        ErrorIndicator(errorDetails);
      }

      if (response.user) {
        const { username, email, token, image } = response.user;
        setCookie('Authorization', token, { secure: true });
        manageUserToStore(username, email, image);
        history.push('/');
      }
    });
  };

  return (
    <div className={classes.form_wrapper}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={classes.form__header}>Sign In</h4>
        <label className={classes.form__label} htmlFor="login__email">
          Email address
          <input
            className={classes.form__input}
            type="email"
            id="login__email"
            {...register('loginEmail', { required: true })}
          />
        </label>
        <label className={classes.form__label} htmlFor="login__password">
          Password
          <input
            className={classes.form__input}
            type="password"
            id="login__password"
            {...register('loginPassword', { required: true })}
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className={classes['form__submit-button']}
        >
          Login
        </button>
        <p className={classes.form__description}>
          Don't have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
        {errors.loginPassword && <span>This field is required</span>}
      </form>
    </div>
  );
};

export default SignInForm;
