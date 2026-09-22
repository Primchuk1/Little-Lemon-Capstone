import { useReducer } from "react";
import BookingForm from "../Components/BookingForm";

import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import Nav from '../Components/Nav'

export function initializeTimes(date) {
    return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
}


export function updateTimes(state, action) {
    switch (action.type) {
        case "UPDATE_TIMES":
            return initializeTimes(action.date);
        default:
            return state;
    }
}

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

