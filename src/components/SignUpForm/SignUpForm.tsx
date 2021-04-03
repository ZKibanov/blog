import React from 'react';
import { useForm } from 'react-hook-form';
import BlogApi from '../../api/BlogApiService';
import { updateUserInStore } from '../../store/dataReducer';
import store from '../../store/store';

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
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => {
    const { signupUsername, signupPassword, signupEmail } = data;
    const userInfo = {
      user: {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      },
    };
    BlogApi('users', 'POST', userInfo).then((response) => {
      const errorDetails = response.data.errors;
      if (response.status === 422) {
        for (const property in errorDetails) {
          if (Object.prototype.hasOwnProperty.call(errorDetails, property)) {
            console.log(`${property}: ${errorDetails[property]}`);
          }
        }
        // do smthing
      }
      store.dispatch(updateUserInStore(response.user));
    });
    // console.log(JSON.stringify(user));
  };

  console.log(watch('signupUsername')); // watch input value by passing the name of it
  console.log(watch('signupPersonalData'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="signup__username">
        Username
        <input
          id="signup__username"
          name="signupUsername"
          ref={register({ required: true })}
        />
      </label>
      <label htmlFor="signup__email">
        Email address
        <input
          id="signup__email"
          type="email"
          name="signupEmail"
          ref={register({ required: true })}
        />
      </label>
      <label htmlFor="signup__password">
        Password
        <input
          type="password"
          id="signup__password"
          name="signupPassword"
          ref={register({ required: true })}
        />
      </label>
      <label htmlFor="signup__repeat_password">
        Repeat Password
        <input
          type="password"
          id="signin__repeat_password"
          name="signupRepeatPassword"
          ref={register({ required: true })}
        />
      </label>
      <label htmlFor="signup__personal_data">
        I agree to the processing of my personal information
        <input
          type="checkbox"
          id="signup__personal_data"
          name="signupPersonalData"
          ref={register({ required: true })}
        />
      </label>
      <button type="submit">Create</button>
      {errors.signupPassword && <span>This field is required</span>}
    </form>
  );
}
// Валидный ответ от сервера на успешную регистрацию
//   {
//     "user": {
//       "id": 155653,
//       "email": "z.kibanov3@yandex.ru",
//       "createdAt": "2021-04-01T14:43:41.323Z",
//       "updatedAt": "2021-04-01T14:43:41.331Z",
//       "username": "zozo19823",
//       "bio": null,
//       "image": null,
//       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTU1NjUzLCJ1c2VybmFtZSI6Inpvem8xOTgyMyIsImV4cCI6MTYyMjQ3MjIyMX0.E3UAiMAuMk77UUdCHisOqr4ZC_u9Qltqyn27n8jT_Yw"
//     }
//   }
