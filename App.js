import React, {useEffect} from 'react';
import {DataProvider} from './src/context/StoreContext';
import {Navigation} from './src/navigation/navigation';

const App = () => {
  return (
    <DataProvider>
      <Navigation />
    </DataProvider>
  );
};

export default App;
