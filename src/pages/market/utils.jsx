import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useState } from "react";

const getFormattedDate = (dt) => {
  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
};

const getFormattedDateWithHour = (dt) => {
  return (
    dt.getFullYear() +
    "/" +
    (dt.getMonth() + 1) +
    "/" +
    dt.getDate() +
    "/" +
    dt.getHours()
  );
};

const isDateWithinRange = (daysSinceNow, date) => {
  const currentDate = new Date(); // Get the current date and time
  const pastDate = new Date(); // Create a new date object for the range
  pastDate.setDate(currentDate.getDate() - daysSinceNow); // Subtract the number of days

  const inputDate = new Date(date); // Convert the input date to a Date object

  // Check if the input date is within the range
  return inputDate >= pastDate && inputDate <= currentDate;
};

export const formatGraphData = (thisApiData, stockTicker, view, range) => {
  let daysAgoOfRange;
  switch (range) {
    case "1D":
      daysAgoOfRange = 1;
      break;
    case "1W":
      daysAgoOfRange = 7;
      break;
    case "1M":
      daysAgoOfRange = 30;
      break;
    case "3M":
      daysAgoOfRange = 60;
      break;
    case "1Y":
      daysAgoOfRange = 365;
      break;
  }

    let tickerFilteredData = thisApiData[stockTicker];

  //Sort array of stocks object by timestamp property from oldest to lastest
  let sortedApiData = tickerFilteredData.sort(function (a, b) {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  let returnGraphData = [];

  const formatDate = (date) => {
    return view === "Day"
      ? getFormattedDate(date)
      : getFormattedDateWithHour(date);
  };

  sortedApiData.forEach((eachData) => {
    const currentDate = new Date(eachData.timestamp);

    if (isDateWithinRange(daysAgoOfRange, currentDate)) {
      const formattedDate = formatDate(currentDate); //Converts date type to YYYY/MM/DD
      const lastDayData = returnGraphData[returnGraphData.length - 1];

      if (returnGraphData.length == 0) {
        returnGraphData.push({
          x: currentDate,
          y: [eachData.price],
        });
      } else if (formatDate(lastDayData.x) == formattedDate) {
        lastDayData.y.push(eachData.price);
      } else {
        returnGraphData.push({
          x: currentDate,
          y: [eachData.price],
        });
      }
    }
  });

  returnGraphData.forEach((thisDayData, index) => {
    view == "Day" ? thisDayData.x.setHours(0, 0, 0, 0) : null; //Remove hour, min, second data from time to prevent displacement in graph

    const prices = thisDayData.y;
    const openPrice = Number(prices[0]);
    const highPrice = Math.max(...prices);
    const lowPrice = Math.min(...prices);
    const closePrice = Number(prices[prices.length - 1]);

    returnGraphData[index] = {
      x: thisDayData.x,
      y: [openPrice, highPrice, lowPrice, closePrice],
    };
  });

  return returnGraphData;
};

/**
 * Custom hook to handle WebSocket connection and return the latest data.
 * @param {string} socketUrl - The WebSocket server URL.
 * @param {object} options - Options for the WebSocket connection (e.g., auto-reconnect).
 * @returns {object} - An object containing the latest data, connection status, and sendMessage function.
 */
export const useWebSocketData = (socketUrl, options = {}) => {
  const [latestData, setLatestData] = useState(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket connected"),
    onClose: () => console.log("WebSocket disconnected"),
    onError: (error) => console.error("WebSocket error:", error),
    shouldReconnect: () => true, // Automatically reconnect by default
    ...options,
  });

  // Update the latest data whenever a new message is received
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        // Parse JSON if the server sends structured data
        const parsedData = JSON.parse(lastMessage.data);
        setLatestData(parsedData);
      } catch {
        // If not JSON, just use raw data
        setLatestData(lastMessage.data);
      }
    }
  }, [lastMessage]);

  // Return the latest data and utility methods
  return {
    latestData,
    connectionStatus: {
      [ReadyState.CONNECTING]: "Connecting",
      [ReadyState.OPEN]: "Open",
      [ReadyState.CLOSING]: "Closing",
      [ReadyState.CLOSED]: "Closed",
      [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState],
    sendMessage,
  };
};