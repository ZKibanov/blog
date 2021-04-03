import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import store from '../../store/store';
import { updateUserInStore } from '../../store/dataReducer';
 

const Header: FC = () => {
    const user = useAppSelector((state) => state.data.user);

if (user !== null){
    const { username } = user;
return (
    <nav>
      <ul>
        <li>
          <Link to="/">Realworld Blog</Link>
        </li>
        <li>
          <Link to="/new-article">Create article</Link>
        </li>
        <li>
          <Link to="/profile">{username}</Link>
        </li>
        <li>
          <button type="button" onClick = {()=>store.dispatch(updateUserInStore(null))} >Log Out</button>
        </li>
      </ul>
    </nav>
  )
}

return (
    <nav>
      <ul>
        <li>
          <Link to="/">Realworld Blog</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
