import { Link } from 'react-router-dom';

function Nav({ className, children }) {
  return (
    <nav className={`${className} primary-nav`} aria-label="Primary navigation">
      {children}
      <ul className="primary-nav__list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/reservations">Reservations</Link></li>
        <li><Link to="/order-online">Order Online</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
