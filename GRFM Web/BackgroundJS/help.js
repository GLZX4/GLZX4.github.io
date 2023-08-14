$(document).ready(function () {
// Retrieve tripType array from local storage
const storedTripType = localStorage.getItem('tripType');
const tripType = JSON.parse(storedTripType);

// Function to print trip types
function printTripTypes() {
    const eventTitleData = $('.eventTitleData');
    
    // Clear any existing content
    eventTitleData.empty();
  
    // Create a list and add items
    const list = $('<ul>');
    tripType.forEach((type, index) => {
      const listItem = $('<li>').text(type);
      list.append(listItem);
    });
  
    // Append the list to the div
    eventTitleData.append(list);
  }

// Call the function to print trip types
printTripTypes();


});