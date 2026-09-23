import { Link } from 'react-router-dom';
import logo from '../assets/little-lemon-logo.svg'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width site-footer__layout">
        <img className="site-footer__logo" src={logo} alt="Little Lemon" />

        <section aria-labelledby="footer-navigation">
          <h2 id="footer-navigation">Doormat Navigation</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order-online">Order Online</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </section>

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact">Contact</h2>
          <address>
            <p>123 Lemon Street, Chicago, IL</p>
            <p><a href="tel:+13125550123">(312) 555-0123</a></p>
            <p><a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a></p>
          </address>
        </section>

        <section aria-labelledby="footer-social">
          <h2 id="footer-social">Social Media</h2>
          <ul>
            <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://x.com/" target="_blank" rel="noreferrer">X</a></li>
          </ul>
        </section>

      </div>
      <p className="copyright"><small>&copy; 2026 Little Lemon. All rights reserved.</small></p>
    </footer>
  )
}

export default Footer
