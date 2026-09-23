import { useState } from "react";

function BookingForm({ availableTimes, dispatch, submitForm }) {

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("Birthday");
    const [error, setError] = useState("");

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;

        setDate(selectedDate);
        setTime("");
        setError("");

        dispatch({
            type: "UPDATE_TIMES",
            date: selectedDate,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            date,
            time,
            guests,
            occasion,
        };

        if (!date || !availableTimes.includes(time)) {
            setError("Please choose an available date and time.");
            return;
        }

        if (submitForm(formData) === false) {
            setError("This time could not be booked. Please choose another available time.");
        }
    }




    return (
        <section className="booking-section page-width" aria-labelledby="booking-title">
            <div className="booking-intro">
                <p className="booking-eyebrow">A seat at our table</p>
                <h2 id="booking-title">Reserve a table</h2>
                <p>Good food, great company. Plan your next visit to Little Lemon and share a taste of the Mediterranean.</p>
            </div>
            <form id="booking-form" className="booking-form" onSubmit={handleSubmit} aria-labelledby="booking-title">
                <fieldset>
                    <legend>Your visit</legend>
                    <div className="booking-form__grid">
                        <div className="booking-form__field">
                            <label htmlFor="res-date">Choose date</label>
                            <input
                                type="date"
                                id="res-date"
                                required
                                value={date}
                                onChange={handleDateChange}
                            />

                        </div>
                        <div className="booking-form__field">
                            <label htmlFor="res-time">Choose time</label>
                            <select
                                id="res-time"
                                required
                                disabled={!date || availableTimes.length === 0}
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            >
                                <option value="" className="time-option">
                                    Select a time
                                </option>

                                {availableTimes.map((availableTime) => (
                                    <option key={availableTime} value={availableTime} className="time-option">
                                        {availableTime}
                                    </option>
                                ))}
                            </select>
                            {date && availableTimes.length === 0 && (
                                <span className="booking-form__hint" role="status">No times available. Please choose another date.</span>
                            )}

                        </div>
                        <div className="booking-form__field">
                            <label htmlFor="guests">Number of guests</label>
                            <input
                                type="number"
                                id="guests"
                                min="1"
                                max="10"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                            />

                        </div>
                        <div className="booking-form__field">
                            <label htmlFor="occasion">Occasion</label>
                            <select
                                id="occasion"
                                value={occasion}
                                onChange={(e) => setOccasion(e.target.value)}
                            >
                                <option>Birthday</option>
                                <option>Anniversary</option>
                            </select>

                        </div>
                    </div>
                </fieldset>
                {error && <p role="alert">{error}</p>}
                <button className="button booking-form__submit" type="submit">
                    Make Your Reservation
                </button>
            </form>
        </section>
    );
};
export default BookingForm;
