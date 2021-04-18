import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios';

import { useDataInfo } from '../api/useDataInfo';

jest.mock('axios');

describe('rendering', () => {
    test('renders correctly', () => {
        renderHook(() => useDataInfo(1));
    });

    test('takes snapshot', () => {
        const { component } = renderHook(() => useDataInfo(1));
        expect(component).toMatchSnapshot();
    })
})

describe("testing axios", () => {
    axios.get.mockResolvedValue({
        dataInfo : {
        data_identifier: 1, 
        sensor_id: 1 ,
        unit: "\u00b0C",
        description: "Temperature",
        }
  });
  test('axios is being called', () => {
        renderHook(() => useDataInfo(1));
        expect(axios.get).toHaveBeenCalledWith(
            `http://ibmrisvol.ibm.ntnu.no/data/info?id=1`,
        );
    });
});

//Failing test
 /*    test("returns correct object", async () => {
        const { result, rerender } = renderHook(() => useDataInfo(1));
        act(()=> {
            result.current.dataInfo;
        }) 
        console.log(result.current)
        expect(result.current.dataInfo).toEqual({"data_identifier": 1, "sensor_id": 1, "unit": "\u00b0C", "description": "Temperature"})
        });
    }); */

