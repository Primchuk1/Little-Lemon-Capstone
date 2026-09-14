import logo from './assets/little-lemon-logo.svg'

function Header() {
  return (
    <header className="brand">
      <a className="brand__link" href="/" aria-label="Little Lemon home">
        <img className="brand__logo" src={logo} alt="Little Lemon" />
      </a>
    </header>
  )
}

export default Header
