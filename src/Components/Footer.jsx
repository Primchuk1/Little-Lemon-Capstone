import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width site-footer__layout">
        <div className="site-footer__brand">
          <Link className="site-footer__logo-link" to="/" aria-label="Back to Little Lemon home">
            <img className="site-footer__logo" src="/images/logo-vertical.png" alt="Little Lemon" width="1362" height="2400" loading="lazy" />
          </Link>
          <p>Mediterranean flavors.<br />A warm Chicago welcome.</p>
        </div>

        <section aria-labelledby="footer-navigation">
          <h2 id="footer-navigation">Explore</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order-online">Order Online</Link></li>
          </ul>
        </section>

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact">Visit us</h2>
          <address>
            <p>123 Lemon Street, Chicago, IL</p>
            <p><a href="tel:+13125550123">(312) 555-0123</a></p>
            <p><a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a></p>
          </address>
        </section>

        <section aria-labelledby="footer-social">
          <h2 id="footer-social">Stay connected</h2>
          <ul>
            <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://x.com/" target="_blank" rel="noreferrer">X</a></li>
          </ul>
        </section>

      </div>
      <div className="page-width site-footer__bottom">
        <p className="copyright"><small>&copy; 2026 Little Lemon. All rights reserved.</small></p>
        <p>Good food. Great company.</p>
      </div>
    </footer>
  )
}

export default Footer
