import { render, screen, fireEvent } from '@testing-library/react';

import ColorButton from './ColorButton';

test('button has correct initial color', () => {
    render(<ColorButton />);
    const colorButton = screen.getByRole('button', { name: 'Change to blue' });
    expect(colorButton).toHaveStyle({
        backgroundColor: 'red'
    });
});

test('button changes color to blue when clicked', () => {
    render(<ColorButton />);
    const colorButton = screen.getByRole('button', { name: 'Change to blue' });
    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({ backgroundColor: 'blue'});
    expect(colorButton.textContent).toBe('Change to red');
});

test('Initial conditions', () => {
    render(<ColorButton />);
    const colorButton = screen.getByRole('button', { name: 'Change to blue' });
    expect(colorButton).toBeEnabled();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
});

test('If button is getting diabled on checking checkbox and vice versa', () => {
    render(<ColorButton />);
    const checkbox = screen.getByRole('checkbox');
    const colorButton = screen.getByRole('button', { name: 'Change to blue' });
    fireEvent.click(checkbox);
    expect(colorButton).not.toBeEnabled();
    fireEvent.click(checkbox);
    expect(colorButton).toBeEnabled();
});