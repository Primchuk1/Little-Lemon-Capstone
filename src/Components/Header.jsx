import { Link } from 'react-router-dom';
import logo from '../assets/little-lemon-logo.svg'

function Header() {
  return (
    <header className="brand">
      <Link className="brand__link" to="/" aria-label="Little Lemon home">
        <img className="brand__logo" src={logo} alt="Little Lemon" />
      </Link>
    </header>
  )
}

export default Header
