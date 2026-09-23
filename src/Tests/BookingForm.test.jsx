import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App, { fetchAPI, initializeTimes, updateTimes } from "../App";
import BookingForm from "../Components/BookingForm";

afterEach(cleanup);
const date = "2026-10-15";
const time = fetchAPI(date)[0];
const reservation = { date, time, guests: 2, occasion: "Birthday" };

test("initializes availability and an empty reservation list", () => {
    const state = initializeTimes();
    expect(state.reservations).toEqual([]);
    expect(state.availableTimes).toEqual(fetchAPI(new Date()));
});

test("excludes booked slots only on their date and prevents duplicates", () => {
    let state = updateTimes(initializeTimes(), { type: "UPDATE_TIMES", date });
    state = updateTimes(state, { type: "ADD_RESERVATION", reservation });
    state = updateTimes(state, { type: "UPDATE_TIMES", date });
    expect(state.availableTimes).toEqual(fetchAPI(date).filter((slot) => slot !== time));
    expect(updateTimes(state, { type: "ADD_RESERVATION", reservation }).reservations).toHaveLength(1);
    const otherDate = "2026-10-16";
    state = updateTimes(state, { type: "UPDATE_TIMES", date: otherDate });
    expect(state.availableTimes).toEqual(fetchAPI(otherDate));
    expect(state.reservations).toEqual([reservation]);
});

test("clears the selected time when the date changes and rejects an empty time", () => {
    const submitForm = vi.fn();
    render(<BookingForm availableTimes={[time]} dispatch={vi.fn()} submitForm={submitForm} />);
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: time } });
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: "2026-10-16" } });
    expect(screen.getByLabelText("Choose time")).toHaveValue("");
    fireEvent.submit(screen.getByRole("form"));
    expect(submitForm).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toBeInTheDocument();
});

test("shows an empty availability message", () => {
    render(<BookingForm availableTimes={[]} dispatch={vi.fn()} submitForm={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    expect(screen.getByLabelText("Choose time")).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("No times available");
});

test.each(["navigation", "hero", "footer", "home"])("keeps reservations when returning via %s", (entry) => {
    render(<MemoryRouter initialEntries={["/reservations"]}><App /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: time } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(screen.getByText(`${date} at ${time} for 1 guests`)).toBeInTheDocument();
    if (entry === "navigation") {
        fireEvent.click(within(screen.getByRole("navigation")).getByRole("link", { name: "Reservations" }));
    } else if (entry === "footer") {
        fireEvent.click(within(screen.getByRole("contentinfo")).getByRole("link", { name: "Reservations" }));
    } else {
        if (entry === "home") fireEvent.click(screen.getByRole("link", { name: "Little Lemon home" }));
        fireEvent.click(screen.getByRole("link", { name: "Reserve a Table" }));
    }
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    expect(within(screen.getByLabelText("Choose time")).queryByRole("option", { name: time })).not.toBeInTheDocument();
    const nextTime = fetchAPI(date).find((slot) => slot !== time);
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: nextTime } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(screen.getByText(`${date} at ${time} for 1 guests`)).toBeInTheDocument();
    expect(screen.getByText(`${date} at ${nextTime} for 1 guests`)).toBeInTheDocument();
});
