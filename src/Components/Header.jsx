import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="brand">
      <Link className="brand__link" to="/" aria-label="Little Lemon home">
        <img className="brand__logo" src="/images/logo-horizontal.png" alt="Little Lemon" width="2000" height="546" />
      </Link>
    </header>
  )
}

export default Header
