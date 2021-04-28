import React, { useState } from 'react';
import { ReactSelect as Select } from "../Select/Select";
import { CustomTimeModal } from "../Modal/CustomTimeModal";

import { useSensorData } from "../../api/useSensorData";
import { useSessionStorage } from '../../storage/useSessionStorage';

import { ChartGroup } from "../SensorChart/ChartGroup";

import moreIcon from "../../icons/more.svg";


const exampleDate = "2021-03-01";
const exampleStartTime = "00:00:00";
const exampleEndTime = "00:11:00";

const chartOptions = [
    {
      value: "edit",
      label: "Edit chart",
    },
  ];

const testSensors = [{
    data_identifier: 2,
    description: "Air temperature",
    sensor_id: 2,
    title: "Air temperature",
    unit: "°C"
    },
{
    data_identifier: 6,
    description: "Maximum 3s wind velocity over last minute",
    sensor_id: 3,
    title: "Wind Speed",
    unit: "m/s" , 
}    
]

export const SensorGroups = () => {
    const sensors =  testSensors
    const [customTimeModalIsOpen, setCustomTimeModalIsOpen] = useState(false);
    const [granularity, setGranularity] = useSessionStorage('granularity', 'measured');

    const closeCustomTimeModal = () => setCustomTimeModalIsOpen(false);

    const [startDate, setStartDate] = useState(exampleDate)
    const [endDate, setEndDate] = useState(exampleDate)

    const [startTime, setStartTime] = useState(exampleStartTime);
    const [endTime, setEndTime] = useState(exampleEndTime);

    const [startDateTime, setStartDateTime] = useSessionStorage('start',  startDate + startTime);
    const [endDateTime, setEndDateTime] = useSessionStorage('end',  endDate + endTime); 

    // Handle change of time frame
    const handleClick = (chartOption) => {
        if (chartOption.value === "edit") {
        setCustomTimeModalIsOpen(true);
        }
    };

    // Handle confirm custom time frame from modal
    const handleConfirm = (
        startTimeFromInput,
        endTimeFromInput,
        startDateFromInput,
        endDateFromInput,
        granularity
    ) => {
        setStartTime(startTimeFromInput);
        setEndTime(endTimeFromInput);
        setStartDate(startDateFromInput);
        setEndDate(endDateFromInput);
        setGranularity(granularity);

        // Check for correct time format when using Chrome
        if (startTimeFromInput.length < 6) {
        setStartDateTime(startDateFromInput + startTimeFromInput + ":00");
        } else {
        setStartDateTime(startDateFromInput + startTimeFromInput);
        }
        if (endTimeFromInput.length < 6) {
        setEndDateTime(endDateFromInput + endTimeFromInput + ":00");
        } else {
        setEndDateTime(endDateFromInput + endTimeFromInput);
        }
    };

    return (
        <div className="sensor-chart">
        <h3 className="section-title">{'My Group'}</h3>
        <div className="more">
            <Select
            className="more-select-container"
            classNamePrefix="more-select"
            options={chartOptions}
            icon={moreIcon}
            onChange={handleClick}
            />
        </div>
        <CustomTimeModal
            chartGroup={'My Group'}
            isOpen={customTimeModalIsOpen}
            handleConfirm={handleConfirm}
            closeModal={closeCustomTimeModal}
        />

        <div className="sensor-grid">
            {sensors.length === 0 && <p>No sensors chosen</p>}
            {sensors &&
            sensors.map((sensor, i) => (
                <ChartGroup
                key={i}
                id={sensor.data_identifier}
                dataInfo={sensor}
                startDateTime={startDateTime}
                endDateTime={endDateTime}
                granularity={granularity}
                />  
            ))}
        </div>
        </div>
    );
    }

