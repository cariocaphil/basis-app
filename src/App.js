import React, { useState } from "react";

const RemoteButton = React.lazy(() => import("remoteApp/Button"));

const App = () => {
  const [accountId, setAccountId] = useState("12345"); // Default account ID

  const handleAccountChange = (event) => {
    setAccountId(event.target.value);
  };

  return (
    <div>
      <h1>Basis App (Host)</h1>
      <label htmlFor="account-select">Select Account ID:</label>
      <select id="account-select" value={accountId} onChange={handleAccountChange}>
        <option value="12345">Account 12345</option>
        <option value="67890">Account 67890</option>
        <option value="11121">Account 11121</option>
      </select>

      <React.Suspense fallback={<div>Loading Remote Component...</div>}>
        <RemoteButton accountId={accountId} />
      </React.Suspense>
    </div>
  );
};

export default App;
