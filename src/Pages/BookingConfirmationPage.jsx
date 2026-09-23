import Nav from "../Components/Nav";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

export default function BookingConfirmationPage({ reservations = [] }) {
    const hasReservations = reservations.length > 0;

    return (
        <>
            <Nav className="topbar page-width">
                <Header />
            </Nav>
            <main>
                <Hero />
                <section className="booking-section page-width" aria-labelledby="confirmation-title">
                    <div className="booking-intro">
                        <p className="booking-eyebrow">{hasReservations ? "See you at our table" : "A seat at our table"}</p>
                        <h2 id="confirmation-title">{hasReservations ? "Your booking is confirmed!" : "Plan your next visit"}</h2>
                        <p>{hasReservations
                            ? "Thank you for choosing Little Lemon. We look forward to welcoming you for good food and great company."
                            : "Choose a date and time to share a taste of the Mediterranean with us."}</p>
                    </div>
                    <section className="confirmation-card" aria-labelledby="reservations-title">
                        <h3 id="reservations-title">Your reservations</h3>
                        {hasReservations ? (
                            <ul className="confirmation-list">
                                {reservations.map((reservation, index) => (
                                    <li className="confirmation-list__item" key={`${reservation.date}-${reservation.time}`}>
                                        <div className="confirmation-list__heading">
                                            <h4>Reservation {index + 1}</h4>
                                            <span className="confirmation-list__badge">Confirmed</span>
                                        </div>
                                        <p>{reservation.date} at {reservation.time} for {reservation.guests} guests</p>
                                        <dl className="confirmation-list__contact">
                                            <div><dt>Name</dt><dd>{reservation.name || "Not provided"}</dd></div>
                                            <div><dt>Email</dt><dd>{reservation.email || "Not provided"}</dd></div>
                                            <div><dt>Phone number</dt><dd>{reservation.phone || "Not provided"}</dd></div>
                                        </dl>
                                        {reservation.occasion && <p className="confirmation-list__occasion">Occasion: {reservation.occasion}</p>}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>You have no reservations yet.</p>
                        )}
                        <div className="confirmation-actions">
                            <Link className="button" to="/reservations">{hasReservations ? "Make another reservation" : "Book a table"}</Link>
                            <Link className="confirmation-actions__home" to="/">Back to home</Link>
                        </div>
                    </section>
                </section>
            </main>
            <Footer />
        </>
    )

}

