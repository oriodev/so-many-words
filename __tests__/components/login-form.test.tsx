import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginForm } from "@/components/login-form";

/**
 * tests for the Login Form Component
 */
describe('LoginForm', () => {
  it('submits the correct email and password', async () => {
    // mock and render the login form component
    const mockHandleLogin = jest.fn();
    const { getByLabelText, getByTestId } = render(
      <LoginForm handleLogin={mockHandleLogin} error={undefined} />
    );

    // enter values for email and password
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'user@example.com' }
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    // submit the form
    fireEvent.click(getByTestId(/loginBtn/));

    // check that the mock function gets called with the input values
    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledWith(
        'user@example.com',
        'password123'
      );
    });
  });

  it('displays an error message when an error is provided', () => {
    // render the login form with an error message
    const { getByTestId } = render(
      <LoginForm handleLogin={jest.fn()} error="Invalid login credentials" />
    );

    const errorMessage = getByTestId('errors');

    // check if the page now displays that error message
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Invalid login credentials');
  });
});


