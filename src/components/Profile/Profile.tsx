import React from 'react';
import { useForm } from 'react-hook-form';
import BlogApi from '../../api/BlogApiService';
import { updateUserInStore } from '../../store/dataReducer';
import store from '../../store/store';

type Inputs = {
  avatarImageUrl: string;
  newPassword: string;
  signupEmail: string;
  newUsername: string;
};

export default function Profile() {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
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

  console.log(watch('signupUsername')); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="new__username">
        Username
        <input
          id="new__username"
          name="newUsername"
          ref={register({ required: false })}
        />
      </label>
      <label htmlFor="signup__email">
        Email address
        <input
          id="signup__email"
          type="email"
          name="signupEmail"
          ref={register({ required: false })}
        />
      </label>
      <label htmlFor="new__password">
        New password
        <input
          type="password"
          id="new__password"
          name="newPassword"
          ref={register({ required: false })}
        />
      </label>
      <label htmlFor="avatar__image__url">
        Avatar image(url)
        <input
          type="text"
          id="avatar__image__url"
          name="avatarImageUrl"
          ref={register({ required: false })}
        />
      </label>

      <button type="submit">Save</button>
      {errors.newPassword && <span>This field is required</span>}
    </form>
  );
}
