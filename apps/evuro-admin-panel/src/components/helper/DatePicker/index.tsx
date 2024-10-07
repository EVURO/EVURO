import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi'; // Import calendar icon

const CustomDatePicker = ({ handleChange, id, reset, setReset }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  // console.log('id=========================', id);
  // console.log('selected date=========================', selectedDate);

  useEffect(() => {
    if (reset) {
      setSelectedDate(null);
      setReset(false);
    }
  }, [reset]);

  return (
    <>
      <button
        className="absolute right-3 top-[8px] flex items-center"
        onClick={(e) => {
          document.getElementById(id)?.click();
        }}
      >
        <BiCalendar size={20} color="#9ca4b2" />
      </button>

      <div className="absolute top-4 right-[21%]">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            handleChange(date);
          }}
          dateFormat="YYYY-MM-DD"
          className="hidden"
          id={id}
        />
      </div>
    </>
  );
};

export default CustomDatePicker;
