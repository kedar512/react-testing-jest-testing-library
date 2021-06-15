import { render, screen, fireEvent } from '@testing-library/react';

import ColorButton, { replaceCamelCaseWithSpaces } from './ColorButton';

test('button has correct initial color', () => {
    render(<ColorButton />);
    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
    expect(colorButton).toHaveStyle({
        backgroundColor: 'MediumVioletRed'
    });
});

test('button changes color to blue when clicked', () => {
    render(<ColorButton />);
    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue'});
    expect(colorButton).toHaveTextContent('Change to Medium Violet Red');
});

test('Initial conditions', () => {
    render(<ColorButton />);
    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
    expect(colorButton).toBeEnabled();

    const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
    expect(checkbox).not.toBeChecked();
});

test('If button is getting diabled on checking checkbox and vice versa', () => {
    render(<ColorButton />);
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
    fireEvent.click(checkbox);
    expect(colorButton).toBeDisabled();
    fireEvent.click(checkbox);
    expect(colorButton).toBeEnabled();
});

test('button color is gray when it is disabled and returns to previous color when enabled', () => {
    render(<ColorButton />);
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed'});

    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('spaces with camel cases', () => {
    test('when there is no inner capital letter in the color', () => {
        expect(replaceCamelCaseWithSpaces('Red')).toBe('Red');
    });
    test('when there is one inner capital letter in color', () => {
        expect(replaceCamelCaseWithSpaces('MidnightBlue')).toBe('Midnight Blue');
    });
    test('when there is more than one inner capital letter in color', () => {
        expect(replaceCamelCaseWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
    });
});