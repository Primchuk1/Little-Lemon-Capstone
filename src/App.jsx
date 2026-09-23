import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { validateBooking } from "./bookingValidation";

import HomePage from "./Pages/HomePage";
import BookingPage from "./Pages/BookingPage";
import BookingConfirmationPage from "./Pages/BookingConfirmationPage";
import AboutPage from "./Pages/AboutPage";
import MenuPage from "./Pages/MenuPage";
import OrderOnlinePage from "./Pages/OrderOnlinePage";

const seededRandom = function (seed) {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;

  return function () {
    return (s = (s * a) % m) / m;
  };
};

export const fetchAPI = function (date) {
  const result = [];

  const dateObject = new Date(date);

  const seed =
    dateObject.getFullYear() * 10000 +
    (dateObject.getMonth() + 1) * 100 +
    dateObject.getDate();

  const random = seededRandom(seed);

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ":00");
    }

    if (random() < 0.5) {
      result.push(i + ":30");
    }
  }

  return result;
};

export const submitAPI = function (formData) {
  return true;
};

export function initializeTimes() {
  return {
    availableTimes: fetchAPI(new Date()),
    reservations: [],
  };
}

export function updateTimes(state, action) {
  switch (action.type) {
    case "UPDATE_TIMES": {
      const generatedTimes = fetchAPI(action.date);

      const reservedTimes = state.reservations
        .filter(
          (reservation) =>
            reservation.date === action.date
        )
        .map((reservation) => reservation.time);

      return {
        ...state,
        availableTimes: generatedTimes.filter(
          (time) => !reservedTimes.includes(time)
        ),
      };
    }

    case "ADD_RESERVATION":
      if (state.reservations.some(
        ({ date, time }) => date === action.reservation.date && time === action.reservation.time
      )) return state;

      return {
        ...state,

        reservations: [
          ...state.reservations,
          action.reservation,
        ],

        availableTimes: state.availableTimes.filter(
          (time) =>
            time !== action.reservation.time
        ),
      };

    default:
      return state;
  }
}

function App() {
  const navigate = useNavigate();

  const [bookingState, dispatch] = useReducer(
    updateTimes,
    null,
    initializeTimes
  );

  const submitForm = (formData) => {
    if (Object.keys(validateBooking(formData, fetchAPI(formData.date))).length > 0 ||
      bookingState.reservations.some(
        ({ date, time }) => date === formData.date && time === formData.time
      )) return false;

    const success = submitAPI(formData);

    if (success) {
      dispatch({
        type: "ADD_RESERVATION",
        reservation: formData,
      });

      navigate("/booking-confirmation");
    }

    return success;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/reservations"
        element={
          <BookingPage
            availableTimes={bookingState.availableTimes}
            dispatch={dispatch}
            submitForm={submitForm}
          />
        }
      />

      <Route
        path="/booking-confirmation"
        element={
          <BookingConfirmationPage
            reservations={bookingState.reservations}
          />
        }
      />

      <Route
        path="/about"
        element={<AboutPage />}
      />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/order-online" element={<OrderOnlinePage />} />
    </Routes>
  );
}

export default App;
