import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios';

import { useSensorData } from '../api/useSensorData';

jest.mock('axios');

describe('rendering', () => {
    test('renders correctly', () => {
        renderHook(() => useSensorData(1, '2020-08-0800+00:00', '2020-08-0800+11:00'));
    });

    test('takes snapshot', () => {
        const { component } = renderHook(() => useDataInfo(1, '2020-08-0800+00:00', '2020-08-0800+11:00'));
        expect(component).toMatchSnapshot();
    })
})

describe("testing axios", () => {
  test('axios is being called', () => {
        renderHook(() => useSensorData(1, '2020-08-0800+00:00', '2020-08-0800+11:00'));
        expect(axios.get).toHaveBeenCalledWith(
            `http://ibmrisvol.ibm.ntnu.no/data?from=2020-08-08T00%3A00%3A0Z&until=2020-08-08T00%3A11%3A0Z&identifier=1`,
        );
    });
});




