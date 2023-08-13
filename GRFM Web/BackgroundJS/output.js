$(document).ready(function () {
    let eventList = JSON.parse(localStorage.getItem('events')) || [];

    if (eventList.length > 0) {
      const latestEvent = eventList[eventList.length - 1]; // Get the latest event object
  
      console.log('Displaying events');
      console.log(latestEvent.itemsList);
      $('.eventTitleData').text(latestEvent.eventType);
      $('.eventLocationData').text(latestEvent.location);
      if(latestEvent.eventType == 'Dads'){
      $('.eventTimeData').text('Unkown amount of days');
      } else {
        $('.eventTimeData').text(latestEvent.time + ' Minutes');
      }
      $('.eventTempData').text(latestEvent.temp + ' °C');
      //$('.eventItemsData').text(latestEvent.itemsList.join(' , '));
      const itemsList = latestEvent.itemsList.map(item => '<li>' + item + '</li>').join('');
      $('.eventItemsData').html('<ul>' + itemsList + '</ul>');
    }
  });
  