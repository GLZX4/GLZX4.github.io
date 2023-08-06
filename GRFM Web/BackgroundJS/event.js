// Event.js
  
  // Event class
  class Event {
    
    constructor(eventType, location, time, temp, itemsList) {
      this.location = location;
      this.time = time;
      this.temp = temp;
      this.eventType = eventType;
      this.itemsList = itemsList;
    }
  
    // Method to remove an item from the items list
    removeItem(item) {
      const index = this.itemsList.indexOf(item);
      if (index !== -1) {
        this.itemsList.splice(index, 1);
      }
    }
  
    // Getter and Setter implementations
    getTitle() {
      return this.title;
    }
  
    getLocation() {
      return this.location;
    }
  
    getTime() {
      return this.time;
    }
  
    getEventType() {
      return this.eventType;
    }
  
    setEventType(eventType) {
      this.eventType = eventType;
    }
  
    setTitle(title) {
      this.title = title;
    }
  
    setLocation(location) {
      this.location = location;
    }
  
    setTime(time) {
      this.time = time;
    }
  
    getTemp() {
      return this.temp;
    }
  
    setTemp(temp) {
      this.temp = temp;
    }
  
    // Add other methods as needed
  
    toString() {
      // Implement the logic to generate the string representation of the Event object
      // You can use template literals (`${...}`) to create the string
      // Example: 
      // return `Title: ${this.title}\nLocation: ${this.location}\n...`;
    }
  }