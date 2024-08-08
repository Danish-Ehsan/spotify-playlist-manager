import { NavLink } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function Nav() {
  return (
    <nav className="c-nav">
      <ul className="c-nav__list">
        <li className="c-nav__item">
          <NavLink to="/" className="c-nav__btn">
            Home
          </NavLink>
        </li>
        {isAuthenticated() ? (
          <>
            <li className="c-nav__item">
              <NavLink to="/playlists" className="c-nav__btn">
                Playlists
              </NavLink>
            </li>
            <li className="c-nav__item">
              <NavLink to="/logout" className="c-nav__btn">
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <li className="c-nav__item">
            <NavLink to="/login" className="c-nav__btn">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
