import React, { useState } from 'react';
import AutoCompleteInput from './components/AutoCompleteInput/AutoCompleteInput';

function App() {
  const options = [{ value: 'Burns Bay Road' }, { value: 'Downing Street' }, { value: 'Wall Street' }];
  return (
    <>
      <AutoCompleteInput options={options}></AutoCompleteInput>
    </>
  );
}

export default App;
