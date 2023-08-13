$(document).ready(function() {

  let eventList = JSON.parse(localStorage.getItem('events')) || [];
  let tripType = [
    'Food Shopping',
    'Clothes Shopping',
    'Work',
    'University',
    'Dads',
    'Meet with Friends',
    'Date',
    'town',
    'Muesum',
    'Cinema',
    'Park',
    'Restaurant',
    'Pub',
    'Cafe',
    'Library',
    'Super Market',
    'Trafford Centre',
    'club',
    'Gym',
    'Mums'
  ];
  let tripRandom = [
    'Meet with Friends',
    'Date',
    'Go to the Gym',
    'Cafe',
    'Library',
  ]

  // Enum for items
const items = {
  0: 'Coat',
  1: 'Jacket',
  2: 'Hat',
  3: 'USB Charger TypeC',
  4: 'USB Charger MicroB',
  5: 'PowerBank',
  6: 'Phone',
  7: 'Purse',
  8: 'Pill',
  9: 'Glasses',
  10: 'Keys',
  11: 'Pads',
  12: 'Ticket',
  13: 'Plastic Bag',
  14: 'Backpack',
  15: 'SmallBag',
  16: 'PowderPuff',
  17: 'lipstick',
  18: 'Earphones',
  19: 'Nintendo Switch',
  20: 'Books',
  21: 'Laptop',
  22: 'HairBobbles',
  23: 'HairBrush',
  24: 'Stuffed Animal',
  25: 'Medicine',
  26: 'EyeMask',
  27: 'SkinCare',
  28: 'Shopping List',
  29: 'Gloves',
  30: 'ID',
  31: 'Drink',
  32: 'Snacks',
  33: 'Sun Cream',
  34: 'Pencil Case',
  35: 'memory Stick',
  36: 'Laptop Charger',
  37: 'Water Bottle',
  38: 'Comfy Socks',
  39: 'Tissues',
  40: 'Anxiety Sweets',
};

  const invalid = "Sorry that's not an input you have Chosen, ask George if you are Stuck!";
  const successful = "--Operation Successful--";

  const searchForm = $('#searchForm');
  searchForm.on('submit', handleFormSubmit);

  const randomBtn = $('#randomEventButton');
  $(document).on('click', '.randomEventButton', handleRandomEvent);

  function handleRandomEvent() {
    let randomTitle =  tripRandom[Math.floor(Math.random() * tripRandom.length)];
    let randomLocation = 'Chose your own Location';

    AddEvent(randomTitle, randomLocation);
  }

  async function AddEvent(eventTitle, eventLoc) {
    let items = [];
    const eventType = eventTitle;
    const eventLocation = eventLoc;
    let eventTime = findEventTime(eventType);
    eventTime += findTravelTime(eventLocation);
    const eventTemp = await getWeather();
    items = createItemList(eventType, eventTemp, eventTime);

    const newEvent = new Event(eventType, eventLocation, eventTime, eventTemp, items);
  
    eventList.push(newEvent);
    console.log(newEvent);

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

  function updateRequirementTxt(text) {
    const requirementTxt = $('.requirementTxt');
    if (text === 'location') {
      requirementTxt.text('Where do you want to go?');
    } else {
      requirementTxt.text('What do you need to do Today?');
    }
  
    // Add the class to trigger the animation
    requirementTxt.addClass('changed');
  
    // Remove the class after a short delay (e.g., 1.5 seconds)
    setTimeout(function() {
      requirementTxt.removeClass('changed');
    }, 1200); // Adjust the delay as needed
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
        runningTotal += 999;
        break;
      case tripType[5]:
        runningTotal += 300;
        break;
      case tripType[6]:
        runningTotal += 180;
        break;
      case tripType[7]:
        runningTotal += 120;
        break;
      case tripType[8]:
        runningTotal += 90;
        break;
      case tripType[9]:
        runningTotal += 160;
        break;
      case tripType[10]:
        runningTotal += 60;
        break;
      case tripType[11]:
        runningTotal += 90;
        break;
      case tripType[12]:
        runningTotal += 60;
        break;
      case tripType[13]:
        runningTotal += 40;
        break;
      case tripType[14]:
        runningTotal += 120;
        break;
      case tripType[15]:
        runningTotal += 40;
        break;
      case tripType[16]:
        runningTotal += 180;
        break;
      case tripType[17]:
        runningTotal += 180;
        break;
      case tripType[18]:
        runningTotal += 90;
      default:
        showMessage(invalid);
    }
      return runningTotal;
  }

  function findTravelTime(eventLocation) {
    switch (eventLocation.toLowerCase()) {
      case 'chester':
        return 90;
      case 'trafford centre':
        return 30;
      case 'town':
      case 'manchester':
        return 60;
      case 'urmston':
        return 35;
      default:
        return 30;
    }
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

  function createItemList(eventType, eventTemp, eventTime) {
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
    if(eventTime > 60) {
      itemsList.push(items[40]); // anxietySweets
    }
    switch (eventType) {
      case tripType[0]:
        itemsList.push(...backpackItems());
        itemsList.push(...shoppingitems());
        break;
      case tripType[1]:
        itemsList.push(...backpackItems());
        itemsList.push(...electronicsItems());
        break;
      case tripType[2]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        break;
      case tripType[3]:
        itemsList.push(...backpackItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        itemsList.push(...UniversityItems());
        break;
      case tripType[4]:
        itemsList.push(...backpackItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        itemsList.push(...extednedElectronicsItems());
        break;
      case tripType[5] || tripRandom[0]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        break;
      case tripType[6] || tripRandom[1]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        break;
      case tripType[7]:
        itemsList.push(...backpackItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        break;
      case tripType[8]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        break;
      case tripType[9]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        break;
      case tripType[10]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        break;
      case tripType[11]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        break;
      case tripType[12]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        break;
      case tripType[13] || tripRandom[3]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        break;
      case tripType[14]:
        itemsList.push(...backpackItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...UniversityItems());
        break;
      case tripType[15]:
        itemsList.push(...backpackItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...shoppingitems());
        break;
      case tripType[16]:
        itemsList.push(...backpackItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...shoppingitems());
        break;
      case tripType[17]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        break;
      case tripType[18] || tripRandom[2]:
        itemsList.push(...SmallBagItems());
        itemsList.push(...electronicsItems());
        break;
      case tripType[19]:
        itemsList.push(...backpackItems());
        itemsList.push(...electronicsItems());
        itemsList.push(...makeupItems());
        itemsList.push(...UniversityItems());
        break;
      default:
        showMessage(invalid);
    }
  return itemsList;
}

function backpackItems() {
  return [
    items[14], // backpack
    items[7],  // Purse
    items[30], // id
    items[10], // keys
    items[11]  // pads
  ];
}

function SmallBagItems() {
  return [
    items[15], // smallBag
    items[30], // ID
    items[10], // keys
    items[11]  // pads
  ];
}

function electronicsItems() {
  return [
    items[3], // USBChargerTypeC
    items[5]  // powerBank
  ];
}

function extednedElectronicsItems() {
  return [
    items[4],  // USBChargerMicroB
    items[19]  // nintendoSwitch
  ];
}

function UniversityItems() {
  return [
    items[20], // books
    items[34], // pencilCase
    items[35], // memoryStick
    items[21], // laptop
    items[36]  // laptopCharger
  ];
}

function makeupItems() {
  return [
    items[16], // powderPuff
    items[17]  // lipstick
  ];
}

function shoppingitems() {
  return [
    items[13], // plasticBag
    items[28], // shoppingList
  ];
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