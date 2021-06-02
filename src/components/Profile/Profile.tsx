import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { notification } from 'antd';
import { useAppSelector } from '../../hooks';
import BlogApi from '../../api/BlogApiService';
import { updateUserInStore } from '../../store/dataReducer';
import store from '../../store/store';
import classes from './Profile.module.scss';

type Inputs = {
  avatarImageUrl: string;
  newPassword: string;
  signupEmail: string;
  newUsername: string;
};

const schema = yup.object().shape({
  newUsername: yup.string().min(3).max(20).required(),
  newPassword: yup.string().min(8).max(40),
  signupEmail: yup
    .string()
    .matches(
          /* eslint-disable-next-line */
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email must be valid email'
    )
    .required(),
  avatarImageUrl: yup
    .string()
    .matches(
          /* eslint-disable-next-line */
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    ),
});

export default function Profile() {
  const oldUserInfo = useAppSelector((state) => state.data.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: Inputs) => {
    const {
      newUsername: username,
      newPassword: password,
      avatarImageUrl: image,
      signupEmail: email,
    } = data;

    const userInfo = {
      user: {
        bio: null,
        image,
        username,
        email,
        password,
      },
    };
    BlogApi('user', 'PUT', userInfo).then((response) => {
      if (response.status === 422) {
        const errorDetails = response.data.errors;
        for (const property in errorDetails) {
          if (Object.prototype.hasOwnProperty.call(errorDetails, property)) {
            notification.open({
              message: 'Errors',
              description: `${property}: ${errorDetails[property]}`,
            });
          }
        }
      }
      if (response.user) store.dispatch(updateUserInStore(response.user));
    });
  };

  return (
    <div className={classes.form_wrapper}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={classes.form__header}>Edit profile</h4>
        <label className={classes.form__label} htmlFor="new__username">
          Username
          <input
            className={classes.form__input}
            id="new__username"
            defaultValue={oldUserInfo?.username || ''}
            {...register('newUsername', { required: false })}
          />
          <p className={classes.form__error}>{errors.newUsername?.message}</p>
        </label>
        <label className={classes.form__label} htmlFor="signup__email">
          Email address
          <input
            className={classes.form__input}
            id="signup__email"
            placeholder="Email address"
            defaultValue={oldUserInfo?.email || ''}
            {...register('signupEmail', { required: false })}
          />
          <p className={classes.form__error}>{errors.signupEmail?.message}</p>
        </label>
        <label className={classes.form__label} htmlFor="new__password">
          New password
          <input
            className={classes.form__input}
            type="password"
            id="new__password"
            defaultValue=''
            {...register('newPassword', { required: false })}
          />
          <p className={classes.form__error}>{errors.newPassword?.message}</p>
        </label>
        <label className={classes.form__label} htmlFor="avatar__image__url">
          Avatar image(url)
          <input
            className={classes.form__input}
            type="text"
            id="avatar__image__url"
            defaultValue={oldUserInfo?.image || ''}
            {...register('avatarImageUrl', { required: false })}
          />
          <p className={classes.form__error}>
            {errors.avatarImageUrl?.message}
          </p>
        </label>

        <button className={classes['form__submit-button']} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
