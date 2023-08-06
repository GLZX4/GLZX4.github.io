$(document).ready(function() {

  let eventList = JSON.parse(localStorage.getItem('events')) || [];
  let tripType = [
    'Food Shopping',
    'Clothes Shopping',
    'Work',
    'University',
    'Dads',
    'Social',
    'Date'
  ];

  // Enum for items
const items = {
  0: 'coat',
  1: 'jacket',
  2: 'hat',
  3: 'USB Charger TypeC',
  4: 'USB Charger MicroB',
  5: 'powerBank',
  6: 'phone',
  7: 'Purse',
  8: 'pill',
  9: 'glasses',
  10: 'keys',
  11: 'pads',
  12: 'Ticket',
  13: 'plastic Bag',
  14: 'backpack',
  15: 'smallBag',
  16: 'powderPuff',
  17: 'lipstick',
  18: 'earphones',
  19: 'nintendo Switch',
  20: 'Books',
  21: 'Laptop',
  22: 'hairBobbles',
  23: 'hairBrush',
  24: 'stuffed Animal',
  25: 'medicine',
  26: 'eyeMask',
  27: 'skinCare',
  28: 'shopping List',
  29: 'gloves',
  30: 'id',
  31: 'drink',
  32: 'snacks',
  33: 'sunCream'
};

  const invalid = "Sorry that's not an input you have Chosen, ask George if you are Stuck!";
  const successful = "--Operation Successful--";

  const searchForm = $('#searchForm');
  searchForm.on('submit', handleFormSubmit);



  async function AddEvent(eventTitle, eventLoc) {
    let items = [];
    const eventType = eventTitle;
    const eventLocation = eventLoc;
    const eventTime = findEventTime(eventType);
    const eventTemp = await getWeather();
    items = createItemList(eventType, eventTemp);

    const newEvent = new Event(eventType, eventLocation, eventTime, eventTemp, items);
  
    eventList.push(newEvent);

    localStorage.setItem('events', JSON.stringify(eventList)); // Save the updated eventList to local storage

    exitSave(); // Save the updated eventList to local storage
    updateRequirementTxt('event'); // Update the requirement text
    displayEvents(newEvent); // Display the updated eventList on the webpage
  }
  
  function displayEvents(newEvent) {
    // Navigate to the output page, passing any necessary data as query parameters
    const queryParams = `?eventType=${encodeURIComponent(newEvent.eventType)}&location=${encodeURIComponent(newEvent.location)}&time=${encodeURIComponent(newEvent.time)}&temp=${encodeURIComponent(newEvent.temp)}&itemsList=${encodeURIComponent(JSON.stringify(newEvent.itemsList))}`;
    window.location.href = `output.html${queryParams}`;
  }

  async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const searchBar = $('#searchBar');
    const searchTerm = searchBar.val();
    await findEventTitle(searchTerm);
  }

  function updateRequirementTxt (text) {
    const requirementTxt = $('.requirementTxt');
    if (text === 'location') {
      requirementTxt.text('Where do you want to go?');
    } else {
      requirementTxt.text('What do you need to do Today?')
    }
  }

  async function findEventTitle(searchTerm) {
    for (const trip of tripType) {
      if (trip.includes(searchTerm)) {
        updateRequirementTxt('location');
        await getLocation(searchTerm);
      } else {
        showMessage(invalid);
      }
    } 
  }

  async function getLocation(eventType) {
    return new Promise((resolve) => {
      const locationForm = $('#searchForm');
      locationForm.off('submit'); // Remove previous event handlers
      locationForm.on('submit', async function(event) {
        event.preventDefault();
        const searchBar = $('#searchBar');
        const locationTerm = searchBar.val();
        console.log(locationTerm);
        await AddEvent(eventType, locationTerm);
        resolve(); // Resolve the promise after handling the location input
      });
    });
  }
  

  function findEventTime(eventType) { 
    let runningTotal = 0;
    switch (eventType) {
      case tripType[0]:
        runningTotal += 30;
        break;
      case tripType[1]:
        runningTotal += 120;
        break;
      case tripType[2]:
        runningTotal += 120;
        break;
      case tripType[3]:
        runningTotal += 150;
        break;
      case tripType[4]:
        runningTotal += 60;
        break;
      case tripType[5]:
        runningTotal += 300;
        break;
      case tripType[6]:
        runningTotal += 180;
        break;
      default:
        showMessage(invalid);
    }

      return runningTotal;
  }

  async function getWeather() {
    try {
      const response = await fetch('https://api.weatherapi.com/v1/current.json?key=3aea4406382b4a7a9cd193012232707&q=M41&aqi=no');
      const data = await response.json();
      const averageTemp = data.current.temp_c; // Use current.temp_c to get the temperature
      return averageTemp;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  function createItemList(eventType, eventTemp) {
    const itemsList = [];

    // Push items using their numeric IDs
    itemsList.push(items[9]);
    itemsList.push(items[6]);
    itemsList.push(items[18]);

    if (eventTemp <= 10) {
        itemsList.push(items[0]); // coat
        if (eventTemp < 8) {
            itemsList.push(items[2]); // hat
            itemsList.push(items[29]); // gloves
        }
    } else if (eventTemp < 20 && eventTemp > 10) {
        itemsList.push(items[1]); // jacket
    } else if (eventTemp > 20) {
        itemsList.push(items[33]); // sunCream
    }
    if (eventType === tripType[0]) {
        itemsList.push(items[14]); // backpack
        itemsList.push(items[7]); // Purse
        itemsList.push(items[13]); // plasticBag
        itemsList.push(items[28]); // shoppingList
        itemsList.push(items[30]); // id
        itemsList.push(items[10]); // keys
    }
    if (eventType === tripType[1]) {
        itemsList.push(items[14]); // backpack
        itemsList.push(items[7]); // Purse
        itemsList.push(items[16]); // powderPuff
        itemsList.push(items[17]); // lipstick
        itemsList.push(items[5]); // powerBank
        itemsList.push(items[3]); // USBChargerTypeC
        itemsList.push(items[11]); // pads
    }
    if (eventType === tripType[2]) {
      itemsList.push(items[14]); // backpack
      itemsList.push(items[15]); // smallBag
      itemsList.push(items[10]); // keys
      itemsList.push(items[7]); // Purse
      itemsList.push(items[3]); // USBChargerTypeC
      itemsList.push(items[5]); // powerBank
      itemsList.push(items[16]); // powderPuff
      itemsList.push(items[17]); // lipstick
      itemsList.push(items[11]); // pads
      itemsList.push(items[22]); // hairBobbles
      itemsList.push(items[31]); // drink
  }
  if (eventType === tripType[3]) {
      itemsList.push(items[15]); // smallBag
      itemsList.push(items[7]); // Purse
      itemsList.push(items[3]); // USBChargerTypeC
      itemsList.push(items[5]); // powerBank
      itemsList.push(items[16]); // powderPuff
      itemsList.push(items[17]); // lipstick
      itemsList.push(items[11]); // pads
      itemsList.push(items[22]); // hairBobbles
      itemsList.push(items[31]); // drink
      itemsList.push(items[32]); // snacks
      itemsList.push(items[25]); // medicine
      itemsList.push(items[8]); // pill
      itemsList.push(items[12]); // Ticket
  }
  if (eventType === tripType[4]) {
      itemsList.push(items[14]); // backpack
      itemsList.push(items[7]); // Purse
      itemsList.push(items[3]); // USBChargerTypeC
      itemsList.push(items[4]); // USBChargerMicroB
      itemsList.push(items[5]); // powerBank
      itemsList.push(items[16]); // powderPuff
      itemsList.push(items[17]); // lipstick
      itemsList.push(items[11]); // pads
      itemsList.push(items[22]); // hairBobbles
      itemsList.push(items[10]); // keys
      itemsList.push(items[12]); // Ticket
      itemsList.push(items[20]); // Books
      itemsList.push(items[21]); // Laptop
      itemsList.push(items[24]); // stuffedAnimal
      itemsList.push(items[26]); // eyeMask
      itemsList.push(items[27]); // skinCare
      itemsList.push(items[25]); // medicine
      itemsList.push(items[8]); // pill
      itemsList.push(items[23]); // hairBrush
      itemsList.push(items[19]); // nintendoSwitch
  }
  if (eventType === tripType[5]) {
      itemsList.push(items[15]); // smallBag
      itemsList.push(items[10]); // keys
      itemsList.push(items[7]); // Purse
      itemsList.push(items[3]); // USBChargerTypeC
      itemsList.push(items[5]); // powerBank
      itemsList.push(items[16]); // powderPuff
      itemsList.push(items[17]); // lipstick
      itemsList.push(items[11]); // pads
      itemsList.push(items[8]); // pill
  }
  if (eventType === tripType[6]) {
      itemsList.push(items[15]); // smallBag
      itemsList.push(items[7]); // Purse
      itemsList.push(items[3]); // USBChargerTypeC
      itemsList.push(items[5]); // powerBank
      itemsList.push(items[16]); // powderPuff
      itemsList.push(items[17]); // lipstick
      itemsList.push(items[11]); // pads
      itemsList.push(items[8]); // pill
  }
  
  return itemsList;
}


  function showMessage(message) {
    const messageBox = $('#messageBox');
    messageBox.html(message);
    messageBox.addClass('show');
    const closeButton = $('#span');
    closeButton.addClass('close');
    closeButton.html('&times;');
    messageBox.append(closeButton);
    closeButton.on('click', function() {
      messageBox.removeClass('show');
    });
  }

  // Function to handle the click of the "Exit & Save" button
  function exitSave() {
    // Save the eventList to local storage
    localStorage.setItem('events', JSON.stringify(eventList));
  }
});
