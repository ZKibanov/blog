import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BlogApi from '../../api/BlogApiService';
import { updateUserInStore } from '../../store/dataReducer';
import store from '../../store/store';
import classes from './SignUpForm.module.scss';

interface IFormInputs {
  signupPassword: string;
  signupEmail: string;
  signupUsername: string;
  signupRepeatPassword: string;
  signupPersonalData: boolean;
}

const schema = yup.object().shape({
  signupPassword: yup.string().required(),
  signupEmail: yup.string().required(),
  signupUsername: yup.string().required(),
});

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => console.log(data);

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
            {...register('signupUsername')}
          />
          <p className={classes.form__error}>
            {errors.signupUsername?.message}
          </p>
        </label>
        <label className={classes.form__label} htmlFor="signup__email">
          Email address
          <input
            placeholder="Email address"
            className={classes.form__input}
            id="signup__email"
            type="email"
            {...register('signupEmail')}
          />
          <p className={classes.form__error}>{errors.signupEmail?.message}</p>
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
          <p className={classes.form__error}>
            {errors.signupPassword?.message}
          </p>
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
          <p className={classes.form__error}>
            {errors.signupRepeatPassword?.message}
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
            {...register('signupPersonalData', { required: true })}
          />
        </label>
        <button className={classes['form__submit-button']} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

// const schema = yup.object().shape({
//   loginPassword: yup.string().required(),
//   loginEmail: yup.string().required(),
// });

// export default function SignUpForm() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<Inputs>({resolver: yupResolver(schema)});
//   const onSubmit = (data: Inputs) => {
//     console.log(data)
//     const { signupUsername, signupPassword, signupEmail } = data;
//     const userInfo = {
//       user: {
//         username: signupUsername,
//         email: signupEmail,
//         password: signupPassword,
//       },
//     };
//     console.log(userInfo);
//     // BlogApi('users', 'POST', userInfo).then((response) => {
//     //   const errorDetails = response.data.errors;
//     //   if (response.status === 422) {
//     //     for (const property in errorDetails) {
//     //       if (Object.prototype.hasOwnProperty.call(errorDetails, property)) {
//     //         console.log(`${property}: ${errorDetails[property]}`);
//     //       }
//     //     }
//     //     // do smthing
//     //   }
//     //   store.dispatch(updateUserInStore(response.user));
//     // });
//     // console.log(JSON.stringify(user));
//   };

//   console.log(watch('signupUsername')); // watch input value by passing the name of it
//   console.log(watch('signupPersonalData'));

//   return (

//   );
// }
