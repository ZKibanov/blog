import React from 'react';
import { useForm } from 'react-hook-form';
import BlogApi from '../../api/BlogApiService';
import { updateUserInStore } from '../../store/dataReducer';
import store from '../../store/store';
import classes from './SignUpForm.module.scss';

type Inputs = {
  example: string;
  exampleRequired: string;
  signupPassword: string;
  signupEmail: string;
  signupUsername: string;
  signupRepeatPassword: string;
  signupPersonalData: boolean;
};

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => {
    const { signupUsername, signupPassword, signupEmail } = data;
    const userInfo = {
      user: {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      },
    };
    console.log(userInfo);
    // BlogApi('users', 'POST', userInfo).then((response) => {
    //   const errorDetails = response.data.errors;
    //   if (response.status === 422) {
    //     for (const property in errorDetails) {
    //       if (Object.prototype.hasOwnProperty.call(errorDetails, property)) {
    //         console.log(`${property}: ${errorDetails[property]}`);
    //       }
    //     }
    //     // do smthing
    //   }
    //   store.dispatch(updateUserInStore(response.user));
    // });
    // console.log(JSON.stringify(user));
  };

  console.log(watch('signupUsername')); // watch input value by passing the name of it
  console.log(watch('signupPersonalData'));

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
            {...register('signupUsername', { required: true })}
          />
        </label>
        <label className={classes.form__label} htmlFor="signup__email">
          Email address
          <input
            placeholder="Email address"
            className={classes.form__input}
            id="signup__email"
            type="email"
            {...register('signupEmail', { required: true })}
          />
        </label>
        <label className={classes.form__label} htmlFor="signup__password">
          Password
          <input
            placeholder="Password"
            className={classes.form__input}
            type="password"
            id="signup__password"
            {...register('signupPassword', { required: true })}
          />
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
            {...register('signupRepeatPassword', { required: true })}
          />
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
            {...register('signupPersonalData', { required: true })}
          />
        </label>
        <button className={classes['form__submit-button']} type="submit">
          Create
        </button>
        {errors.signupPassword && <span>This field is required</span>}
      </form>
    </div>
  );
}
