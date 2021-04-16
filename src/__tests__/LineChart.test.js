import React from 'react';
import { render } from '@testing-library/react'
import { LineChart } from '../components/SensorChart/LineChart/LineChart';


//Surpressing warning as suggested by:
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
        render(< LineChart />);
    });
    test('takes snapshot', () => {
        const { component } = render(< LineChart />);
        expect(component).toMatchSnapshot();
    })
})