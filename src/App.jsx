import './App.css'
import Footer from './Footer'
import Header from './Header'
import Main from './MainContent'
import Nav from './Nav'

function App() {
  return (
    <>
      <div className="topbar page-width">
        <Header />
        <Nav />
      </div>
      <Main />
      <Footer />
    </>
  )
}

export default App
