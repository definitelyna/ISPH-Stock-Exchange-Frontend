export const getFormattedDate = (dt) => {
  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
};

export const getFormattedDateWithHour = (dt) => {
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

export const formatGraphData = (thisApiData, stockTicker, view, range) => {
  console.log(`ApiData: ${thisApiData}View: ${view}, Range: ${range}, Stock: ${stockTicker}`);
  let tickerFilteredData = thisApiData[stockTicker];

  //Sort array of stocks object by timestamp property from oldest to lastest
  let sortedApiData = tickerFilteredData.sort(function (a, b) {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  let returnGraphData = [];

  const formatDate = (date) => {
    // return view === "day"
    //   ? getFormattedDate(date)
    //   : getFormattedDateWithHour(date);

    return getFormattedDate(date);
  };

  sortedApiData.forEach((eachData) => {
    const currentDate = new Date(eachData.timestamp);
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
  });

  returnGraphData.forEach((thisDayData, index) => {
    view == "day" ? thisDayData.x.setHours(0, 0, 0, 0) : null; //Remove hour, min, second data from time to prevent displacement in graph

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
