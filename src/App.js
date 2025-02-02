import React, { useState, useEffect } from "react";

const RemoteStockDisplay = React.lazy(() => import("remoteApp/StockDisplay"));
const RemoteInterestCalculator = React.lazy(() => import("remoteApp2/InterestCalculator"));

const App = () => {
  const [stockList, setStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const data = await response.json();
        setStockList(data.slice(0, 10)); // Limit to first 10
        setSelectedStock(data[0]?.id || "bitcoin"); // Default selection
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div>
      <h1>Financial Dashboard (Basis App)</h1>
      {loading && <p>Loading available stocks...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <label htmlFor="stock-select">Select a Stock:</label>
          <select
            id="stock-select"
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
          >
            {stockList.map((stock) => (
              <option key={stock.id} value={stock.id}>
                {stock.name} ({stock.symbol.toUpperCase()})
              </option>
            ))}
          </select>

          <React.Suspense fallback={<div>Loading Stock Data...</div>}>
            <RemoteStockDisplay stockId={selectedStock} />
          </React.Suspense>
          <React.Suspense fallback={<div>Loading Interest Calculator...</div>}>
            <RemoteInterestCalculator />
          </React.Suspense>
        </>
      )}
    </div>
  );
};

export default App;
