import '../App.css'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import Main from '../Components/MainContent'
import Nav from '../Components/Nav'


function HomePage() {
    return (
        <>
            <Nav className="topbar page-width">
                <Header />
            </Nav>
            <main>
                <Hero />
                <Main />
            </main>
            <Footer />
        </>
    )
}

export default HomePage;
