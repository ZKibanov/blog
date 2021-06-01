import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BlogApi from '../../api/BlogApiService';
import { manageUserToStore } from '../../utils';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import classes from './SignUpForm.module.scss';

interface IFormInputs {
  Password: string;
  Email: string;
  Username: string;
  RepeatPassword: string;
  PersonalData: boolean;
}

const schema = yup.object().shape({
  Username: yup.string().min(3).max(20).required(),
  Password: yup.string().min(8).max(40).required(),
  Email: yup.string().email(),
  RepeatPassword: yup
    .string()
    .oneOf([yup.ref('Password'), null], 'Passwords must match')
    .required(),
  PersonalData: yup
    .boolean()
    .oneOf([true], 'For registration need your confirmation'),
});

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const [, setCookie, removeCookie] = useCookies(['Token']);


  const onSubmit = (data: IFormInputs) => {
    const { Username, Password, Email } = data;
    const userInfo = {
      user: {
        username: Username,
        email: Email,
        password: Password,
      },
    };
    BlogApi('users', 'POST', userInfo).then(response => {
      if (response.status === 422) {
        const errorDetails = response.data.errors;
        ErrorIndicator(errorDetails);
      } 
      if (response.user) {
        const { username, email, token, image } = response.user;
        setCookie('Authorization', token, { secure: true });
        manageUserToStore(username, email, image);
        history.push('/')
    }
    });
  };

  return (
    <div className={classes.form_wrapper}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={classes.form__header}>Create new account</h4>
        <label className={classes.form__label} htmlFor="signup__username">
          Username
          <input
            placeholder="Username"
            className={classes.form__input}
            id="signup__username"
            {...register('Username')}
          />
          <p className={classes.form__error}>{errors.Username?.message}</p>
        </label>
        <label className={classes.form__label} htmlFor="signup__email">
          Email address
          <input
            placeholder="Email address"
            className={classes.form__input}
            id="signup__email"
            {...register('Email')}
          />
          <p className={classes.form__error}>{errors.Email?.message}</p>
        </label>
        <label className={classes.form__label} htmlFor="signup__password">
          Password
          <input
            placeholder="Password"
            className={classes.form__input}
            type="password"
            id="signup__password"
            {...register('Password', { required: true })}
          />
          <p className={classes.form__error}>{errors.Password?.message}</p>
        </label>
        <label
          className={classes.form__label}
          htmlFor="signup__repeat_password"
        >
          Repeat Password
          <input
            placeholder="Repeat Password"
            className={classes.form__input}
            type="password"
            id="signin__repeat_password"
            {...register('RepeatPassword', { required: true })}
          />
          <p className={classes.form__error}>
            {errors.RepeatPassword?.message}
          </p>
        </label>
        <hr className={classes.line} />
        <label
          className={classes['form__label-agreement']}
          htmlFor="signup__personal_data"
        >
          I agree to the processing of my personal information
          <input
            className={classes['form__agreement-checkbox']}
            type="checkbox"
            id="signup__personal_data"
            {...register('PersonalData', { required: true })}
          />
          <p className={classes.form__error}>{errors.PersonalData?.message}</p>
        </label>
        <button className={classes['form__submit-button']} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
