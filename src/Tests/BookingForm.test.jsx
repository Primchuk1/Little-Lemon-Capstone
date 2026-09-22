import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import BookingForm from "../Components/BookingForm";
import { initializeTimes, updateTimes } from "../Pages/BookingPage";

describe('BookingForm', () => {
    test('Renders the BookingForm ', () => {
        const { container } = render(<BookingForm availableTimes={[]} dispatch={() => { }} />);
        const headingElement = screen.getByText("Reserve a table");
        expect(headingElement).toBeInTheDocument();
    });

    test('Renders the BookingForm with available times', () => {
        const availableTimes = initializeTimes(new Date());

        const { container } = render(<BookingForm availableTimes={availableTimes} dispatch={() => { }} />);
        const timeOptions = container.querySelectorAll(".time-option");
        expect(timeOptions).toHaveLength(availableTimes.length + 1);
    });


});


describe('initializeTimes', () => {
    test('Returns an array of available times', () => {
        const times = initializeTimes(new Date());
        expect(times).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
    });
});


describe('updateTimes', () => {
    test('Updates the available times based on the selected date', () => {
        const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        const action = { type: "UPDATE_TIMES", date: new Date() };
        const updatedTimes = updateTimes(initialState, action);
        expect(updatedTimes).toEqual(initialState);
    });
});
