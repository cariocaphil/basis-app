import React, { useState, useEffect, Suspense } from "react";

const RemoteStockDisplay = React.lazy(() => import("remoteApp/StockDisplay"));
const RemoteInterestCalculator = React.lazy(() => import("remoteApp2/InterestCalculator"));
const RemoteTaxEstimator = React.lazy(() => import("remoteApp3/TaxEstimator"));

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
  padding: "20px",
};

const tileStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  margin: "10px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "350px",
  textAlign: "center",
  transition: "transform 0.2s ease-in-out",
  minHeight: "250px", // Ensures each tile retains space while loading
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

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
        setStockList(data.slice(0, 10));
        setSelectedStock(data[0]?.id || "bitcoin");
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
      <h1 style={{ textAlign: "center" }}>Financial Dashboard (Basis App)</h1>
      
      {loading && <p style={{ textAlign: "center" }}>Loading available stocks...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <label htmlFor="stock-select">Select a Stock:</label>
            <select
              id="stock-select"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            >
              {stockList.map((stock) => (
                <option key={stock.id} value={stock.id}>
                  {stock.name} ({stock.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div style={containerStyle}>
            <div style={tileStyle}>
              <Suspense fallback={<div>Loading Stock Data...</div>}>
                <RemoteStockDisplay stockId={selectedStock} />
              </Suspense>
            </div>

            <div style={tileStyle}>
              <Suspense fallback={<div>Loading Interest Calculator...</div>}>
                <RemoteInterestCalculator />
              </Suspense>
            </div>

            <div style={tileStyle}>
              <Suspense fallback={<div>Loading Tax Estimator (this one is slower)...</div>}>
                <RemoteTaxEstimator />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
