const axios = require('axios');
const ExcelJS = require('exceljs');

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI4MTEzMDc1OCwiYWFpIjoxMSwidWlkIjozNTk5MDQ1NiwiaWFkIjoiMjAyMy0wOS0xMlQwMDo1OTozNy44ODdaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTM4MzY2MzMsInJnbiI6InVzZTEifQ.rObDZ4yY6Kt1WA8h_OpFBLbXYJFnFEf5XH1Ds0Qw-VU'; // Replace with your actual API key
const BOARD_ID = '5064556198'; // Replace with your board's actual ID

// GraphQL query to fetch data
const graphqlQuery = `
  query {
    boards(ids: [${BOARD_ID}]) {
      items {
        name
        column_values {
          title
          text
        }
      }
    }
  }
`;

// Function to fetch data using GraphQL
async function fetchDataFromMonday() {
  try {
    // Send a POST request to the Monday.com GraphQL API
    const response = await axios.post('https://api.monday.com/v2', {
      query: graphqlQuery,
    }, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = response.data.data;

    // Transform data for Excel (simplified example)
    const transformedData = data.boards[0].items.map((item) => ({
      Case: item.name,
      Commission: findColumnValue(item, 'Commission'), // Replace with your actual column title
      InvoiceAmount: findColumnValue(item, 'Invoice Amount'), // Replace with your actual column title
      FiledDate: findColumnValue(item, 'Filed Date'), // Access 'Filed Date' column
      DBS: findColumnValue(item, 'DBS#'), // Add 'DBS' field
      Court: findColumnValue(item, 'Court'), // Add 'Court' field
      JobType: findColumnValue(item, 'Job Type'), // Add 'Job Type' field
      Count: findColumnValue(item, 'Count'), // Add 'Count' field
      ADCase: findColumnValue(item, 'AD Case #'), // Add 'AD Case' field
      // Add more fields as needed
    }));

    // Generate an Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add headers to the worksheet
    const headers = Object.keys(transformedData[0]);
    worksheet.addRow(headers);

    // Add data to the worksheet
    transformedData.forEach((row) => {
      worksheet.addRow(Object.values(row));
    });

    // Save the Excel file
    await workbook.xlsx.writeFile('report.xlsx');

    console.log('Excel report generated successfully.');

    // You can add email sending logic here to send the generated Excel file via email
  } catch (error) {
    console.error('Error fetching data from Monday.com:', error.message);
  }
}

// Function to find a column value with error handling
function findColumnValue(item, columnName) {
  const column = item.column_values.find((col) => col.title === columnName);
  return column ? column.text : ''; // Use 'text' property directly
}

// Execute the function to start the process
fetchDataFromMonday();
