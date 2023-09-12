const axios = require('axios');

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI4MTEyODMzNywiYWFpIjoxMSwidWlkIjozNTk5MDQ1NiwiaWFkIjoiMjAyMy0wOS0xMlQwMDozODo0NS4xMTVaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTM4MzY2MzMsInJnbiI6InVzZTEifQ.jQdo-ZfXGjg7TwKo3eKi4Ubf96sGIiD7YGeDCCMmlPg'; // Replace with your actual API key
const BOARD_ID = '4691406696'; // Replace with your actual board's ID

// Monday.com API URL for fetching board items
const apiUrl = `https://api.monday.com/v2/boards/${BOARD_ID}/items`;

// Set up headers with the API key
const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

// Function to fetch board data
async function fetchBoardData() {
  try {
    // Send a GET request to the Monday.com API
    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      // Process data
      const boardItems = response.data.data;
      console.log('Data from Monday.com:', boardItems);
    } else {
      console.error('Error fetching data from Monday.com. Status:', response.status);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: API key may be incorrect or lacks proper permissions.');
    } else {
      console.error('An error occurred while fetching data from Monday.com:', error.message);
    }
  }
}

// Call the fetchBoardData function to start the process
fetchBoardData();


// ...

async function fetchBoardData() {
  try {
    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      // Process data
    } else {
      console.error('Error fetching data from Monday.com. Status:', response.status);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: API key may be incorrect or lacks proper permissions.');
    } else {
      console.error('An error occurred while fetching data from Monday.com:', error.message);
    }
  }
}

// ...

