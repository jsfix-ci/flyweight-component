import Button from 'src/components/Button/';
import React from 'react';

function App() {
  return (
    <div
      className="App"
      style={{
        marginLeft:
          '20px',
        display:
          'flex',
        justifyContent:
          'space-around',
        alignContent:
          'center',
        alignItems:
          'center',
      }}
    >
      <h1>
        tes
      </h1>
      <Button
        size="lg"
        type="danger"
      >
        默认
      </Button>
      <Button
        size="sm"
        type="danger"
      >
        默认
      </Button>
      <Button
        size="md"
        type="danger"
      >
        默认
      </Button>
    </div>
  );
}

export default App;
