import { getByTestId, getByText, render } from '@testing-library/react'
import {act, renderHook} from '@testing-library/react-hooks'
import axios from 'axios';
import { useEffect } from 'react';

import { useDataInfo } from '../api/useDataInfo';

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

jest.mock('axios');
axios.get.mockImplementationOnce(() => Promise.resolve(data));

describe('testing axios', async () => {
    test('fetches data correctly', () => {
        const dataInfo = {
            data_identifier: 1,
            description: "Temperature",
            sensor_id: 1,
            unit: "°C"
        }
        const { render } = renderHook(( => useEffect))
        expect(useDataInfo(1)).resolves.toEqual(dataInfo);
      
        expect(axios.get).toHaveBeenCalledWith(
            `http://ibmrisvol.ibm.ntnu.no/data/info?id=${id}/search?query=react`,
        );
    });
});
