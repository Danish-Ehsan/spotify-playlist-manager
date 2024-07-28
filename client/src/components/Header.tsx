import { Link } from "react-router-dom";
import logo from "../../public/app-logo.png";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="c-header">
      <Link to="/" className="c-header__logo">
        <img src={logo} alt="Logo" />
      </Link>
      <Nav />
    </header>
  );
}
