import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


function App() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);




  useEffect(() => {
    fetch('http://www.mocky.io/v2/5d1ef97d310000552febe99d')
      .then(response => response.json())
      .then(data => {


        setData(data)

      });

  }, []);

  const handlelikeClick = (item) => {
    // Create a copy of the item object
    const updatedItem = Object.assign({}, item);

    // Retrieve the likes count from local storage
    const likes = JSON.parse(localStorage.getItem('likes'));

    // If the likes property exists in local storage, update the likes count for the updatedItem object
    if (likes) {
      updatedItem.likes = likes[item._id] || 0;
    }

    // Increment the likes count for the updatedItem object
    updatedItem.likes += 1;

    // Store the updated likes count in local storage
    localStorage.setItem('likes', JSON.stringify({
      ...likes,
      [item._id]: updatedItem.likes
    }));

    // Update the data in the component
    setData(data.map(i => (i._id === item._id ? updatedItem : i)));
  };

  function filterData(startDate, endDate) {
    // Filter the data using the start and end dates

    const filteredData = data.filter(item => {
      const date = new Date(item.publishedDate);
      return date >= startDate && date <= endDate;
    });

    // Update the data in the component
    setData(filteredData);
  }


  return (
    <div>
      <div style={{ backgroundColor: 'blue', width: '100%', height: '3em' }}>
        <span style={{ fontSize: '2em', paddingLeft: '1em', color: 'white' }}>twitter task</span>
      </div>
      <div>

        <label>Date Range Picker</label>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        <br />
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
        <button onClick={() => filterData(startDate, endDate)}>Filter</button>
      </div>


      {
        data ? (
          <div style={{ maxWidth: '100%', margin: '0', padding: '0', display: 'flex', flexWrap: 'wrap' }}>
            {data.map(item => (
              // Use the data here to render something in the component

              <div key={item._id} style={{ margin: '1em', backgroundColor: 'lightgrey', padding: '2em' }}>
                <a href={item.url}>{item.url.slice(20, 30)}</a>
                <img src={item.imageUrl} alt="" />
                <hr />
                <button onClick={() => handlelikeClick(item)}>Likes:{item.likes}</button>

              </div>

            ))}


          </div>
        ) : (
          <div>Loading data...</div>
        )
      }


    </div >
  );
}

export default App
