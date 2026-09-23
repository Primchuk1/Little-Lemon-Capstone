import React from "react";
import Nav from "../Components/Nav";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Main from "../Components/MainContent";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";

export default function BookingConfirmationPage({ reservations }) {


    return (
        <>
            <Nav className="topbar page-width">
                <Header />
            </Nav>
            <Hero />
            <h2>Your booking for  is confirmed!</h2>
            <p>Here's the list of all reservations: {reservations.map((reservation, index) => (
                <li key={index}>
                    {reservation.date} at {reservation.time} for {reservation.guests} guests
                </li>
            ))}</p>
            <Footer />
        </>
    )

}

