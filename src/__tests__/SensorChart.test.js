import React from 'react';
import { render } from '@testing-library/react'

import { SensorChart } from '../components/SensorChart/SensorChart';


//Suppressing warning as suggested by:
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

//Providing props
const dataInfo = {
    data_identifier: 1,
    description: "Temperature",
    sensor_id: 1,
    title: "Temperature",
    unit: "°C",
}

const dataInfo1 = {
    description: "Temperature"
}

const id = {id: 1}

describe('renders without crashing and takes snapshot', () => {
    test('renders correctly', async() => {
        render(< SensorChart dataInfo={dataInfo} />);
    });
    test('takes snapshot', async () => {
        const component = render(< SensorChart dataInfo={dataInfo} />);
        expect(component).toMatchSnapshot();
    })
});

describe('displays correct elements', () => {

    test('displays loading while fetching data', async () =>  {
        const { getByTestId } = render( < SensorChart dataInfo={dataInfo}  />)
        const load = getByTestId('loading');
        expect(load).toHaveTextContent("Loading ...");
    })

    /* test('display correct sensor name (Temperature)', () => {
        const { getByText } = render(< LineChart data={data} dataInfo={dI1} />);
        getByText('Temperature');
    })

    test('display correct sensor name (Air Temperature)', () => {
        const { getByText } = render(< LineChart data={data} dataInfo={dI2} />);
        getByText('Air Temperature');
    })

    test('display correct sensor ID', () => {
        const { getByText } = render(< LineChart data={data} dataInfo={dI1} />);
        getByText('Sensor ID: 1');
    }); */
})
