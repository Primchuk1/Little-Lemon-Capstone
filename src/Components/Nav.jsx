import { Link } from 'react-router-dom';

function Nav({ className, children }) {
  return (
    <nav className={`${className} primary-nav`} aria-label="Primary navigation">
      {children}
      <ul className="primary-nav__list">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/menu">Menu</a></li>
        <li><a href="/reservations">Reservations</a></li>
        <li><a href="/order-online">Order Online</a></li>
      </ul>
    </nav>
  )
}

export default Nav
