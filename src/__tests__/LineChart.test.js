import React from 'react';
import { render } from '@testing-library/react'
import { LineChart } from '../components/SensorChart/LineChart/LineChart';


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
const data = [
    {0: {measurement: "17", time_stamp_utc: "2020-08-08T00:00:00Z" }},
    {1: {measurement: "17", time_stamp_utc: "2020-08-08T00:01:00Z" }}
];

const data2 = [
    {0: {measurement: "17", time_stamp_utc: "2020-09-08T00:02:00Z" }},
    {1: {measurement: "17", time_stamp_utc: "2020-09-08T00:03:00Z" }}
];

const data0 = [
    {0: {measurement: "", time_stamp_utc: "" }},
    {1: {measurement: "", time_stamp_utc: "" }}
];

const dI1 = {
    data_identifier: 1,
    description: "Temperature",
}

const dI2 = {
    data_identifier: 2,
    description: "Air Temperature",
}

describe('renders without crashing and takes snapshot', () => {
    test('renders correctly', () => {
        render(< LineChart data={data} dataInfo={dI1} />);
    });
    test('takes snapshot', () => {
        const { component } = render(< LineChart data={data} dataInfo={dI1} />);
        expect(component).toMatchSnapshot();
    })

})

describe('displays correct elements', () => {

    test('displays loading while fetching data', () =>  {
        const { getByTestId } = render( < LineChart data={[data0]}/>)
        const load = getByTestId('loading');
        expect(load).toHaveTextContent("Loading chart...");
    })


    test('display correct sensor name (Temperature)', () => {
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
    });
})


describe('Converts date to text correctly', () => {
    test('08082020 ', () => {
        const { queryByText } = render(< LineChart data={data} dataInfo={dI1} />);
        queryByText(/Saturday 08 August 2020/i);
    })
    test('090820', () => {
        const { queryByText } = render(< LineChart data={data2} dataInfo={dI1} />);
        queryByText(/Sunday 09 August 2020/i);
    })
})
   
