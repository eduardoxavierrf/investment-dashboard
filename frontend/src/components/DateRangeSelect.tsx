import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const DateRangeSelect = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleFilter = () => {
    const symbol = searchParams.get('symbol')
    if(!symbol) return
    const params = new URLSearchParams({symbol, startDate, endDate});
    navigate(`/?${params.toString()}`)
  };

  useEffect(() => {
    const paramsStartDate = searchParams.get('startDate')
    if (paramsStartDate) {
      setStartDate(paramsStartDate)
    }

    const paramsEndDate = searchParams.get('endDate')
    if (paramsEndDate) {
      setEndDate(paramsEndDate)
    }
  }, [searchParams]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className='flex gap-4 text-sm'>
          <div>
            <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Date:</label>
            <input
              type="date"
              id="start"
              value={startDate}
              onChange={handleStartDateChange}
              className="mt-1 block w-40 border border-gray-200 rounded p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className=''>
            <label htmlFor="end" className="block text-sm font-medium text-gray-700">End Date:</label>
            <input
              type="date"
              id="end"
              value={endDate}
              onChange={handleEndDateChange}
              className="mt-1 block w-40 border border-gray-200 rounded p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <button
          onClick={handleFilter}
          className="inline-flex items-center justify-center rounded-lg font-medium text-sm bg-green-500 text-white px-3 py-3"
        >
          Filter
        </button>
      </div>
      <p className="mt-4 text-gray-700">
        Selected Range: {startDate} to {endDate}
      </p>
    </div>
    
  );
};

export default DateRangeSelect;
