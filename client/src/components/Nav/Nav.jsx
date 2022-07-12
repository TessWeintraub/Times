import React from "react";
import { Link, NavLink } from "react-router-dom";

import navClasses from "./Nav.module.scss";
import { ReactComponent as Logo } from "../../assets/Logo.svg";

const Nav = ({ location }) => {
  return (
    <nav className={navClasses[`${location}__nav`]}>
      <Link to="/">
        <Logo
          className={navClasses[`${location}__logo`]}
          src={Logo}
          alt="Logo"
        />
      </Link>
      <div className={navClasses[`header__buttons`]}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? navClasses[`active__link__${location}`]
              : navClasses[`inactive__link__${location}`]
          }
        >
          All articles
        </NavLink>
        <NavLink
          to="/add-article"
          className={({ isActive }) =>
            isActive
              ? navClasses[`active__link__${location}`]
              : navClasses[`inactive__link__${location}`]
          }
        >
          Add article
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
