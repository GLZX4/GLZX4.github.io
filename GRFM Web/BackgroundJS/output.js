$(document).ready(function () {
    let eventList = JSON.parse(localStorage.getItem('events')) || [];

  
    $(window).resize(function() {
      adjustFontSize();
  });

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

    adjustFontSize();

  function adjustFontSize() {
    const eventItemsData = $('.eventItemsData');
    const maxheight = window.innerHeight * 0.21;

    if(eventItemsData[0].scrollHeight > maxheight) {
      eventItemsData.css('font-size', '1.8rem');
      let fontSize = 2 * (maxheight / eventItemsData[0].scrollHeight);
      eventItemsData.css('font-size', fontSize + 'vmin');
    } else {
      eventItemsData.css('font-size', 'calc(2vh + 2vw + 2vmin)');
    }
  }

  });
  