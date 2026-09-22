import { useState } from "react";

function BookingForm({ availableTimes, dispatch }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("Birthday");

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;

        setDate(selectedDate);

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

        console.log(formData);
    };

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
                                value={date}
                                onChange={handleDateChange}
                            />

                        </div>
                        <div className="booking-form__field">
                            <label htmlFor="res-time">Choose time</label>
                            <select
                                id="res-time"
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
                <button className="button booking-form__submit" type="submit">
                    Make Your Reservation
                </button>
            </form>
        </section>
    );
}

export default BookingForm;
