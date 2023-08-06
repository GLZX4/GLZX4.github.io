$(document).ready(function () {
    let eventList = JSON.parse(localStorage.getItem('events')) || [];
  
    if (eventList.length > 0) {
      const latestEvent = eventList[eventList.length - 1]; // Get the latest event object
  
      console.log('Displaying events');
      console.log(latestEvent.itemsList);
      $('.eventTitleData').text(latestEvent.eventType);
      $('.eventLocationData').text(latestEvent.location);
      $('.eventTimeData').text(latestEvent.time);
      $('.eventTempData').text(latestEvent.temp);
      $('.eventItemsData').text(latestEvent.itemsList.join(', '));
      console.log(latestEvent);
    }
  });
  