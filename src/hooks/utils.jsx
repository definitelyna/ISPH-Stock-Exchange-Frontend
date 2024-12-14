export const getAssetObject = (apiData) => {
    let newAssetData = {};
    let totalPointValue = apiData.points_balance;
    const stockPossession = apiData.items;
  
    Object.keys(stockPossession).forEach((stock) => {
      const thisStockData = stockPossession[stock];
      const existingStocksInAssetData = Object.keys(newAssetData);
      const thisStockSector = thisStockData.stockSector;
      const thisStockValue = thisStockData.evaluation;
  
      if (existingStocksInAssetData.includes(thisStockSector)) {
        newAssetData[thisStockSector] += thisStockValue;
      } else {
        newAssetData[thisStockSector] = thisStockValue;
      }
    });
  
    newAssetData.points = totalPointValue;
    return newAssetData;
  };

  export const getTransformedAssetDoughnutData = (apiData) => {
    let data = {
      labels: [],
      datasets: [
        {
          label: "Value",
          data: [],
          backgroundColor: [
            "#53ff45",
            "#1E2EDE",
            "#6A041D",
            "#F5B841",
            "#F4FF52",
          ],
        },
      ],
    };
  
    data.labels.push("Points");
    data.datasets[0].data.push(apiData.points_balance);
  
    const stockPossession = apiData.items;
  
    Object.keys(stockPossession).forEach((stock) => {
      const thisStockData = stockPossession[stock];
      const thisStockSector = thisStockData.stockSector;
      const thisStockValue = thisStockData.evaluation;
      if (data.labels.includes(thisStockSector)) {
        const labelIndex = data.labels.indexOf(thisStockSector);
        data.datasets[0].data[labelIndex] += thisStockValue;
      } else {
        data.labels.push(thisStockSector);
        data.datasets[0].data.push(thisStockValue);
      }
    });
  
    //Add balance to asset
  
    return data;
  };