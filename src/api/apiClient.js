export async function fetchApiData(apiUrl, method, route) {
    try {
        const result = await fetch(
          `${apiUrl}${route}`,
          {
            method: method,
          }
        );
  
        const data = await result.json();
        return data;
      } catch (err) {
        console.log(`Error fetching data: ${err}`);
      }
}