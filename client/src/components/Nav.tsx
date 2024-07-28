import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="c-nav">
      <ul className="c-nav__list">
        <li className="c-nav__item">
          <NavLink to="/playlists" className="c-nav__btn">
            Playlists
          </NavLink>
        </li>
        <li className="c-nav__item">
          <NavLink to="/login" className="c-nav__btn">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
