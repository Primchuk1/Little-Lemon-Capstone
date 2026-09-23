import { useReducer } from "react";

import BookingForm from "../Components/BookingForm";

import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import Nav from '../Components/Nav'



export default function BookingPage({ availableTimes, dispatch, submitForm }) {
    return (
        <>
            <Nav className="topbar page-width">
                <Header />
            </Nav>
            <main>
                <Hero />
                <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
            </main>

            <Footer />
        </>
    )
}

