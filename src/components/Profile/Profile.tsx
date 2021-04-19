import React from 'react';
import { useForm } from 'react-hook-form';
import BlogApi from '../../api/BlogApiService';
import { updateUserInStore } from '../../store/dataReducer';
import store from '../../store/store';
import classes from './Profile.module.scss'

type Inputs = {
  avatarImageUrl: string;
  newPassword: string;
  signupEmail: string;
  newUsername: string;
};

export default function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => {
    const {
      newUsername: username,
      newPassword: password,
      avatarImageUrl: image,
      signupEmail: email,
    } = data;
    // here is the problem - how to manage empty strings))
    const userInfo = {
      user: {
        bio: null,
        image,
        username,
        email,
        password,
      },
    };
    console.log(data);
    BlogApi('user', 'PUT', userInfo).then((response) => {
      console.log(response);
      //   const errorDetails = response.data.errors;
      //   if (response.status === 422) {
      //     for (const property in errorDetails) {
      //       if (Object.prototype.hasOwnProperty.call(errorDetails, property)) {
      //         console.log(`${property}: ${errorDetails[property]}`);
      //       }
      //     }
      //     // do smthing
      //   }
      // //   store.dispatch(updateUserInStore(response.user));
    });
    // console.log(JSON.stringify(user));
  };

  console.log(watch('newUsername')); // watch input value by passing the name of it

  return (
    <div className={classes.form_wrapper}>
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
    <h4 className={classes.form__header}>Edit profile</h4>
      <label className={classes.form__label} htmlFor="new__username">
        Username
        <input
                className={classes.form__input}

          id="new__username"
          {...register('newUsername', { required: false })}
        />
      </label>
      <label className={classes.form__label} htmlFor="signup__email">
        Email address
        <input
        className={classes.form__input}
          id="signup__email"
          type="email"
          {...register('signupEmail', { required: false })}
        />
      </label>
      <label className={classes.form__label} htmlFor="new__password">
        New password
        <input
                className={classes.form__input}

          type="password"
          id="new__password"
          {...register('newPassword', { required: false })}
        />
      </label>
      <label className={classes.form__label} htmlFor="avatar__image__url">
        Avatar image(url)
        <input
                className={classes.form__input}

          type="text"
          id="avatar__image__url"
          {...register('avatarImageUrl', { required: false })}
        />
      </label>

      <button className={classes["form__submit-button"]} type="submit">Save</button>
      {errors.newPassword && <span>This field is required</span>}
    </form>
    </div>
  );
}
