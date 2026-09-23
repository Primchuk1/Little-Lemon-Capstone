import { useState } from "react";
import { localDateString, validateBooking } from "../bookingValidation";

function BookingForm({ availableTimes, dispatch, submitForm }) {
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("Birthday");
    const [error, setError] = useState("");
    const [touched, setTouched] = useState({});
    const errors = validateBooking({ ...contact, date, time, guests, occasion }, availableTimes);
    const fieldError = (field) => touched[field] ? errors[field] : undefined;
    const markTouched = (field) => setTouched((previous) => ({ ...previous, [field]: true }));

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;

        setDate(selectedDate);
        setTime("");
        setError("");
        setTouched((previous) => ({ ...previous, time: false }));

        dispatch({
            type: "UPDATE_TIMES",
            date: selectedDate,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: contact.name.trim(),
            email: contact.email.trim(),
            phone: contact.phone.trim(),
            date,
            time,
            guests: Number(guests),
            occasion,
        };

        const validationErrors = validateBooking({ ...contact, date, time, guests, occasion }, availableTimes);
        setTouched({ name: true, email: true, phone: true, date: true, time: true, guests: true, occasion: true });
        if (Object.keys(validationErrors).length > 0) {
            setError("Please correct the highlighted fields before making your reservation.");
            const fieldIds = { name: "res-name", email: "res-email", phone: "res-phone", date: "res-date", time: "res-time", guests: "guests", occasion: "occasion" };
            const firstInvalid = Object.keys(validationErrors).find((field) =>
                !e.currentTarget.querySelector(`#${fieldIds[field]}`).disabled
            );
            if (firstInvalid) e.currentTarget.querySelector(`#${fieldIds[firstInvalid]}`).focus();
            return;
        }

        setError("");
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
            <form id="booking-form" className="booking-form" noValidate onSubmit={handleSubmit} onChange={() => setError("")} aria-labelledby="booking-title">
                <p className="booking-form__note">All fields are required. Tables can be reserved for 1–10 guests.</p>
                <fieldset>
                    <legend>Your details</legend>
                    <div className="booking-form__grid">
                        {[
                            { field: "name", label: "Name", type: "text", autoComplete: "name", maxLength: 100 },
                            { field: "email", label: "Email", type: "email", autoComplete: "email", maxLength: 254 },
                            { field: "phone", label: "Phone number", type: "tel", autoComplete: "tel", maxLength: 40 },
                        ].map(({ field, label, type, autoComplete, maxLength }) => (
                            <div className={`booking-form__field${field === "name" ? " booking-form__field--full" : ""}`} key={field}>
                                <label htmlFor={`res-${field}`}>{label}</label>
                                <input
                                    id={`res-${field}`}
                                    name={field}
                                    type={type}
                                    autoComplete={autoComplete}
                                    maxLength={maxLength}
                                    required
                                    value={contact[field]}
                                    onChange={(event) => setContact((previous) => ({ ...previous, [field]: event.target.value }))}
                                    onBlur={() => markTouched(field)}
                                    aria-invalid={Boolean(fieldError(field))}
                                    aria-describedby={fieldError(field) ? `${field}-error` : undefined}
                                />
                                {fieldError(field) && <span className="booking-form__error" id={`${field}-error`}>{fieldError(field)}</span>}
                            </div>
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Your visit</legend>
                    <div className="booking-form__grid">
                        <div className="booking-form__field">
                            <label htmlFor="res-date">Choose date</label>
                            <input
                                type="date"
                                id="res-date"
                                required
                                min={localDateString()}
                                onBlur={() => markTouched("date")}
                                aria-invalid={Boolean(fieldError("date"))}
                                aria-describedby={fieldError("date") ? "date-error" : undefined}
                                value={date}
                                onChange={handleDateChange}
                            />
                            {fieldError("date") && <span className="booking-form__error" id="date-error">{fieldError("date")}</span>}

                        </div>
                        <div className="booking-form__field">
                            <label htmlFor="res-time">Choose time</label>
                            <select
                                id="res-time"
                                required
                                onBlur={() => markTouched("time")}
                                aria-invalid={Boolean(fieldError("time"))}
                                aria-describedby={fieldError("time") ? "time-error" : undefined}
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
                            {fieldError("time") && <span className="booking-form__error" id="time-error">{fieldError("time")}</span>}
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
                                step="1"
                                required
                                onBlur={() => markTouched("guests")}
                                aria-invalid={Boolean(fieldError("guests"))}
                                aria-describedby={fieldError("guests") ? "guests-error" : undefined}
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                            />
                            {fieldError("guests") && <span className="booking-form__error" id="guests-error">{fieldError("guests")}</span>}

                        </div>
                        <div className="booking-form__field">
                            <label htmlFor="occasion">Occasion</label>
                            <select
                                id="occasion"
                                required
                                onBlur={() => markTouched("occasion")}
                                aria-invalid={Boolean(fieldError("occasion"))}
                                aria-describedby={fieldError("occasion") ? "occasion-error" : undefined}
                                value={occasion}
                                onChange={(e) => setOccasion(e.target.value)}
                            >
                                <option>Birthday</option>
                                <option>Anniversary</option>
                            </select>
                            {fieldError("occasion") && <span className="booking-form__error" id="occasion-error">{fieldError("occasion")}</span>}

                        </div>
                    </div>
                </fieldset>
                {error && <p className="booking-form__error" role="alert">{error}</p>}
                <button className="button booking-form__submit" type="submit">
                    Make Your Reservation
                </button>
            </form>
        </section>
    );
};
export default BookingForm;
