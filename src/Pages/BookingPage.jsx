import BookingForm from "../Components/BookingForm";

import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import Nav from '../Components/Nav'



export default function BookingPage() {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
    return (
        <>
            <Nav className="topbar page-width">
                <Header />
            </Nav>
            <main>
                <Hero />
                <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
            </main>

            <Footer />
        </>
    )
}

