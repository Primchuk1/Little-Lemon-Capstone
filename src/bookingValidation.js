export function localDateString(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function validateBooking({ name = "", email = "", phone = "", date, time, guests, occasion }, availableTimes, now = new Date()) {
    const errors = {};
    if (!name.trim() || !/\p{L}/u.test(name) || name.trim().length > 100) {
        errors.name = "Please enter your name (up to 100 characters).";
    }
    if (email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = "Please enter a valid email address, such as you@example.com.";
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!/^\+?[\d\s().-]+$/.test(phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
        errors.phone = "Please enter a phone number with 7 to 15 digits. Spaces, parentheses, hyphens, and a leading + are allowed.";
    }
    const selectedDate = new Date(`${date}T00:00:00`);

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(selectedDate.getTime()) || localDateString(selectedDate) !== date) {
        errors.date = "Please choose a valid date.";
    } else if (date < localDateString(now)) {
        errors.date = "Please choose today or a future date.";
    }

    if (!time || !availableTimes.includes(time)) {
        errors.time = "Please choose an available time.";
    } else if (!errors.date && new Date(`${date}T${time}:00`) <= now) {
        errors.time = "Please choose a time in the future.";
    }

    const guestCount = Number(guests);
    if (String(guests).trim() === "" || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
        errors.guests = "Please enter a whole number of guests from 1 to 10.";
    }

    if (!["Birthday", "Anniversary"].includes(occasion)) {
        errors.occasion = "Please choose an occasion.";
    }

    return errors;
}
