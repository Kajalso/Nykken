import React from 'react';
import { render } from '@testing-library/react';

import { Button } from '../components/Button/Button';
import userEvent from '@testing-library/user-event';
import { easeCircle } from 'd3-ease';

//Suppressing warning as suggested by:
// https://github.com/testing-library/react-testing-library
const originalError = global.console.error;
beforeAll(() => {
	global.console.error = jest.fn((...args) => {
		if (typeof args[0] === 'string' && args[0].includes('Please upgrade to at least react-dom@16.9.0')) {
	      return
	    }
	    return originalError.call(console, args)
	});
});

afterAll(() => {
  	global.console.error.mockRestore();
});

describe('renders without crashing and takes snapshot', () => {
    test('renders correctly', () => {
        render(< Button />);
    });
    test('takes snapshot', () => {
        const component = render(< Button />);
        expect(component).toMatchSnapshot();
    })
})

describe('Button works', () => {
	// Tests that clicked changes to true once it is clicked 
	test('onClick', () => {
		let clicked = false;
		const { getByRole } = render(<Button text={"Edit Dashboard"} onClick={() => clicked=true }  />);
		const button = getByRole('button', 'Edit Dashboard');

		userEvent.click(button);
		expect(clicked).toBe(true);
	})

	// Tests that onClick calls a function
	test('onClick with mocked function', () => {
		const onClick = jest.fn();
		const { getByRole } = render(<Button text={"Edit Dashboard"} onClick={onClick}  />);
		const button = getByRole('button', 'Edit Dashboard');

		userEvent.click(button);
		expect(onClick).toHaveBeenCalled();
	})
})