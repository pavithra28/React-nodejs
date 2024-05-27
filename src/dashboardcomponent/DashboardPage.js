import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const passenger = useSelector(state => state.passenger.passenger);
  const flights = useSelector(state => state.passenger.flights);
  const [sortBy, setSortBy] = useState('departure');
  const [notification, setNotification] = useState('');

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    if (flights && flights.length > 0) {
      flights.forEach(flight => {
        checkTimeDifference(flight.scheduled_departure, flight.actual_departure);
        checkTimeDifference(flight.scheduled_arrival,flight.actual_arrival);
      });
    }
  }, [flights]);

  const checkTimeDifference = (scheduledTime, actualTime) => {
    const scheduled = new Date(scheduledTime);
    const actual = new Date(actualTime);
    const timeDifference = Math.abs(actual - scheduled) / (1000 * 60); // in minutes
    if (timeDifference > 5) { // Adjust this threshold as needed
      setNotification(`There is a significant difference in time. Scheduled: ${scheduled.toLocaleString()}, Actual: ${actual.toLocaleString()}`);
    }
  };

  if (!passenger) {
    return <div className="text-center">Log In to View the Flight Details</div>;
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Welcome, {passenger.name}!</h2>
        <h5 className="text-center">Oops! You have not booked any flight yet.</h5>
      </div>
    );
  }

  const sortedFlights = flights.slice().sort((a, b) => {
    if (sortBy === 'departure') {
      return new Date(a.scheduled_departure) - new Date(b.scheduled_departure);
    } else if (sortBy === 'arrival') {
      return new Date(a.scheduled_arrival) - new Date(b.scheduled_arrival);
    } else {
      return 0;
    }
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome, {passenger.name}!</h1>
      <div className="d-flex justify-content-end">
      <div className='="flex-grow-1'>
        <select className="form-select mt-3 mb-3" value={sortBy} onChange={handleSortChange}>
          <option value="departure">Sort by Departure</option>
          <option value="arrival">Sort by Arrival</option>
        </select>
        </div>
      </div>
      {notification && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          {notification}
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseNotification}></button>
        </div>
      )}
      <div className="row">
        {sortedFlights.map(flight => (
          <div className="col-md-6" key={flight.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{flight.departure_airport} to {flight.arrival_airport}</h5>
                <p className="card-text">{
                  sortBy === 'departure' ? 
                  `Scheduled Departure: ${new Date(flight.scheduled_departure).toLocaleString()}` :
                  `Scheduled Arrival: ${new Date(flight.scheduled_arrival).toLocaleString()}`
                }</p>
                <p className="card-text">Status: {flight.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
