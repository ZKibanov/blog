import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { useAppSelector } from '../../hooks';
import store from '../../store/store';
import { updateUserInStore } from '../../store/dataReducer';
import classes from './Header.module.scss'

const Header: FC = () => {
  const user = useAppSelector((state) => state.data.user);
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);

  if (user !== null && user.image !== null) {
    const { username, image } = user;
    return (
      <nav className = {classes.header}>
        <Link to="/">Realworld Blog</Link>

        <ul className = {classes.header__nav}>
          <li>
            <Link className = {classes.header__nav_link} to="/new-article">Create article</Link>
          </li>
          <li>
            <Link className = {classes.header__nav_link} to="/profile">{username}</Link>
          </li>
          <li>
          <Avatar className={classes.card__avatar} size={46} icon={ <img src={image} alt="avatar" />} />
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                store.dispatch(updateUserInStore(null));
                removeCookie('Authorization');
              }}
            >
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    );
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
};

export default Header;
