import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => (
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

export default Header;
