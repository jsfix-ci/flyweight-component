import React from 'react';
import Alert from './components/Alert';
function App() {
  return (
    <div
      className="App"
      style={{
        marginLeft: '20px',
        display: 'flex',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>tes</h1>
      <Alert type="success" hiddenTime={2000}></Alert>
    </div>
  );
}

export default App;
