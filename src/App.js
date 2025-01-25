import React, { Suspense } from "react";

// Importing remote component dynamically
const RemoteButton = React.lazy(() => import("remoteApp/Button"));

const App = () => {
  return (
    <div>
      <h1>Basis App (Host)</h1>
      <Suspense fallback={<div>Loading Remote Component...</div>}>
        <RemoteButton />
      </Suspense>
    </div>
  );
};

export default App;
