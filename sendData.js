// example of reading from config file (not needed)
// const fs = require('fs');
// const path = require('path');

// const configPath = path.resolve(__dirname, 'config.json');
// const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
// const apiUrl = config.apiUrl;
// const apiKey = config.apiKey;

// aws api gateway
const apiUrl = 'https://8cdgfq0r3c.execute-api.us-east-1.amazonaws.com/TestV01/sensor-data';

// local time (not needed, generated in lambda)
let getFormatTime = () => {
    // Create a new Date object
    const date = new Date();
  
    // Get the UTC time offset
    const timeOffset = 60; // in minutes
  
    // Calculate the local time in Hong Kong
    const localTime = new Date(date.getTime() + timeOffset * 60 * 1000);
  
    // Extract the individual components of the time
    const year = localTime.getFullYear();
    const month = String(localTime.getMonth() + 1).padStart(2, '0');
    const day = String(localTime.getDate()).padStart(2, '0');
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    const seconds = String(localTime.getSeconds()).padStart(2, '0');
  
    // Format the time string
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedTime;
}

// generate random data function
let getRandomArbitrary = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(1);
}

// send data to api
let sendData = () => {
    // generate random data
    let jsonData = { 
        Temperature: getRandomArbitrary(21, 25), 
        // Time: getFormatTime(),
        Humidity: getRandomArbitrary(40, 60),
        eCO2: getRandomArbitrary(380, 520),
        TVOC: getRandomArbitrary(1, 100),
        Location: "Living Room"
    };
    // check data
    // console.log(jsonData);

    // Use PUT to insert data to db
    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};


setInterval(sendData, 10*60000); // send data every 10 minutes
// sendData();