import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "./loginComponents";

describe("Login Form Tests", () => {
  test("renders login form with all fields and button", () => {
    render(<Login />);

    // Periksa apakah input email ada
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    expect(emailInput).toBeInTheDocument();

    // Periksa apakah input password ada
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    expect(passwordInput).toBeInTheDocument();

    // Periksa apakah tombol submit ada
    const submitButton = screen.getByText(/Sign In/i);
    expect(submitButton).toBeInTheDocument();
  });

  test("updates state when email and password are typed", () => {
    render(<Login />);

    // Simulasikan input email
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    // Simulasikan input password
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    fireEvent.change(passwordInput, { target: { value: "mypassword" } });
    expect(passwordInput.value).toBe("mypassword");
  });

  test("calls handleSubmit when form is submitted", () => {
    const mockHandleSubmit = jest.fn();
    render(<Login handleSubmit={mockHandleSubmit} />);

    // Simulasikan klik tombol submit
    const submitButton = screen.getByText(/Sign In/i);
    fireEvent.click(submitButton);

    // Periksa apakah fungsi handleSubmit dipanggil
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
