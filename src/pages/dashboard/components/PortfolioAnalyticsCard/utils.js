//Write me a function that takes in an array of objects {x: Date, y: Number} and a time period before today's date (1D, 1W, 1M, 3M, 1Y) and filters and leave only the data objects in that time period
//The function should return an array of objects {x: Date, y: Number} that is filtered

export function filterByTimePeriod(data, timePeriod) {
    const now = new Date();
    let startDate;
  
    switch (timePeriod) {
      case "1D":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        break;
      case "1W":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case "1M":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case "3M":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case "1Y":
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        throw new Error("Invalid time period. Use '1D', '1W', '1M', '3M', or '1Y'.");
    }
  
    // Filter data to include only those objects with 'x' after the calculated startDate
    return data.filter((entry) => entry.x >= startDate);
  }