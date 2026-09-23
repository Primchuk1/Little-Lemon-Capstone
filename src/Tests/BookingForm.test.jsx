import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, afterEach, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App, { fetchAPI, initializeTimes, updateTimes } from "../App";
import BookingForm from "../Components/BookingForm";

beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 8, 23, 18, 0));
});
afterEach(() => {
    cleanup();
    vi.useRealTimers();
});
const date = "2026-10-15";
const time = fetchAPI(date)[0];
const reservation = { date, time, guests: 2, occasion: "Birthday" };
const contact = { name: "Alex Rivera", email: "alex@example.com", phone: "+1 (312) 555-0142" };

function fillContact(details = contact) {
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: details.name } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: details.email } });
    fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: details.phone } });
}

test.each([
    ["Name", ""], ["Name", "   "], ["Name", "1234"], ["Name", "A".repeat(101)],
    ["Email", ""], ["Email", "alex"], ["Email", "alex@"], ["Email", "alex@@example.com"], ["Email", "alex rivera@example.com"],
    ["Phone number", ""], ["Phone number", "123"], ["Phone number", "1234567890123456"],
    ["Phone number", "call me tomorrow"], ["Phone number", "++1 312 555 0142"],
])("rejects invalid %s value '%s' and associates its error with the field", (label, value) => {
    const submitForm = vi.fn();
    render(<BookingForm availableTimes={[time]} dispatch={vi.fn()} submitForm={submitForm} />);
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: time } });
    const input = screen.getByLabelText(label);
    fireEvent.change(input, { target: { value } });
    fireEvent.blur(input);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(/Please enter/);
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(input).toHaveFocus();
    expect(submitForm).not.toHaveBeenCalled();
});

test("accepts international names and formatted phone numbers, trims details, and clears corrected errors", () => {
    const submitForm = vi.fn();
    render(<BookingForm availableTimes={[time]} dispatch={vi.fn()} submitForm={submitForm} />);
    fireEvent.blur(screen.getByLabelText("Name"));
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
    fillContact({ name: "  Zoë O'Neill  ", email: " zoe+booking@example.co.uk ", phone: " +44 20 7946 0958 " });
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "false");
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: time } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(submitForm).toHaveBeenCalledWith({ name: "Zoë O'Neill", email: "zoe+booking@example.co.uk", phone: "+44 20 7946 0958", date, time, guests: 1, occasion: "Birthday" });
});

test("keeps each reservation's contact details on the confirmation page", () => {
    render(<MemoryRouter initialEntries={["/reservations"]}><App /></MemoryRouter>);
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: time } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    for (const value of Object.values(contact)) expect(screen.getByText(value)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Make another reservation" }));
    const secondContact = { name: "李", email: "li@example.com", phone: "312-555-0199" };
    fillContact(secondContact);
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: fetchAPI(date)[1] } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    const firstCard = screen.getByRole("heading", { name: "Reservation 1" }).closest("li");
    const secondCard = screen.getByRole("heading", { name: "Reservation 2" }).closest("li");
    for (const value of Object.values(contact)) expect(within(firstCard).getByText(value)).toBeInTheDocument();
    for (const value of Object.values(secondContact)) expect(within(secondCard).getByText(value)).toBeInTheDocument();
});

test("shows required errors and focuses the name on an empty submission", () => {
    const submitForm = vi.fn();
    render(<BookingForm availableTimes={[time]} dispatch={vi.fn()} submitForm={submitForm} />);
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(submitForm).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Name")).toHaveFocus();
    expect(screen.getByLabelText("Choose date")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Choose date")).toHaveAccessibleDescription("Please choose a valid date.");
});

test.each(["", "0", "11", "1.5", "-1"])("rejects invalid guest count '%s'", (value) => {
    const submitForm = vi.fn();
    render(<BookingForm availableTimes={[time]} dispatch={vi.fn()} submitForm={submitForm} />);
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: time } });
    fireEvent.change(screen.getByLabelText("Number of guests"), { target: { value } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(submitForm).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Number of guests")).toHaveFocus();
    expect(screen.getByLabelText("Number of guests")).toHaveAccessibleDescription("Please enter a whole number of guests from 1 to 10.");
});

test("shows errors on blur and clears them after correction", () => {
    const submitForm = vi.fn();
    render(<BookingForm availableTimes={[time]} dispatch={vi.fn()} submitForm={submitForm} />);
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: "2026-09-22" } });
    fireEvent.blur(screen.getByLabelText("Choose date"));
    expect(screen.getByLabelText("Choose date")).toHaveAccessibleDescription("Please choose today or a future date.");
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    expect(screen.getByLabelText("Choose date")).toHaveAttribute("aria-invalid", "false");
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: time } });
    fireEvent.change(screen.getByLabelText("Number of guests"), { target: { value: "10" } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(submitForm).toHaveBeenCalledWith({ ...contact, date, time, guests: 10, occasion: "Birthday" });
});

test("rejects elapsed times today and accepts a later time", () => {
    const submitForm = vi.fn();
    render(<BookingForm availableTimes={["17:00", "19:00"]} dispatch={vi.fn()} submitForm={submitForm} />);
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: "2026-09-23" } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: "17:00" } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(submitForm).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Choose time")).toHaveAccessibleDescription("Please choose a time in the future.");
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: "19:00" } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(submitForm).toHaveBeenCalledOnce();
});

test("rejects a selected time that becomes unavailable", () => {
    const submitForm = vi.fn();
    const dispatch = vi.fn();
    const { rerender } = render(<BookingForm availableTimes={[time]} dispatch={dispatch} submitForm={submitForm} />);
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: time } });
    rerender(<BookingForm availableTimes={[]} dispatch={dispatch} submitForm={submitForm} />);
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(submitForm).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Choose time")).toHaveAttribute("aria-invalid", "true");
});

test("rejects an empty occasion and displays submission failures", () => {
    const submitForm = vi.fn(() => false);
    render(<BookingForm availableTimes={[time]} dispatch={vi.fn()} submitForm={submitForm} />);
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: time } });
    fireEvent.change(screen.getByLabelText("Occasion"), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(submitForm).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Occasion")).toHaveAccessibleDescription("Please choose an occasion.");
    fireEvent.change(screen.getByLabelText("Occasion"), { target: { value: "Anniversary" } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(screen.getByRole("alert")).toHaveTextContent("This time could not be booked");
});

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
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: time } });
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: "2026-10-16" } });
    expect(screen.getByLabelText("Choose time")).toHaveValue("");
    fireEvent.submit(screen.getByRole("form"));
    expect(submitForm).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toBeInTheDocument();
});

test("shows an empty availability message", () => {
    render(<BookingForm availableTimes={[]} dispatch={vi.fn()} submitForm={vi.fn()} />);
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    expect(screen.getByLabelText("Choose time")).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("No times available");
});

test.each(["navigation", "hero", "footer", "home"])("keeps reservations when returning via %s", (entry) => {
    render(<MemoryRouter initialEntries={["/reservations"]}><App /></MemoryRouter>);
    fillContact();
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
    fillContact();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: date } });
    expect(within(screen.getByLabelText("Choose time")).queryByRole("option", { name: time })).not.toBeInTheDocument();
    const nextTime = fetchAPI(date).find((slot) => slot !== time);
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: nextTime } });
    fireEvent.click(screen.getByRole("button", { name: "Make Your Reservation" }));
    expect(screen.getByText(`${date} at ${time} for 1 guests`)).toBeInTheDocument();
    expect(screen.getByText(`${date} at ${nextTime} for 1 guests`)).toBeInTheDocument();
});
