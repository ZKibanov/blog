import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import { Avatar } from 'antd';
import { useAppSelector } from '../../hooks';
import store from '../../store/store';
import { updateUserInStore } from '../../store/dataReducer';
import { User } from '../../types';
import classes from './Header.module.scss';

const Header: FC = () => {
  const userData = useAppSelector((state) => state.data.user);
  const [, , removeCookie] = useCookies(['Token']);
  const history = useHistory();

  const getHeaderContent = (user: User | null) => {
    if (user) {
      const { username } = user;
      let { image } = user;
      if (!image)
        image = 'https://static.productionready.io/images/smiley-cyrus.jpg';
      return (
        <ul className={classes.header__nav}>
          <li className={classes.header__nav_item}>
            <Link className={classes.header__nav_link_small} to="/new-article">
              Create article
            </Link>
          </li>
          <li className={classes.header__nav_item}>
            <Link className={classes.header__link_flat} to="/profile">
              {username}
            </Link>
          </li>
          <li className={classes.header__nav_item}>
            <Avatar
              className={classes.card__avatar}
              size={46}
              icon={<img src={image} alt="avatar" />}
            />
          </li>
          <li className={classes.header__nav_item}>
            <button
              className={classes['header__nav_button-log-out']}
              type="button"
              onClick={() => {
                store.dispatch(updateUserInStore(null));
                removeCookie('Authorization');
                history.go(0);
              }}
            >
              Log Out
            </button>
          </li>
        </ul>
      );
    }
    return (
      <ul className={classes.header__nav}>
        <li className={classes.header__nav_item}>
          <Link className={classes.header__link_flat} to="/sign-in">
            Sign In{' '}
          </Link>
        </li>
        <li className={classes.header__nav_item}>
          <Link className={classes['header__nav_link-sign-up']} to="/sign-up">
            {' '}
            Sign Up{' '}
          </Link>
        </li>
      </ul>
    );
  };

  const content = getHeaderContent(userData);

  return (
    <nav className={classes.header}>
      <Link className={classes.header__link_flat} to="/">
        Realworld Blog
      </Link>
      {content}
    </nav>
  );
};

export default Header;
