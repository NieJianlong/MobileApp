import React, { Component } from 'react';
import RootContainer from './Root';
import UserInfo from './UserInfo';

const AppContext = React.createContext('App');
function App(props) {
  return (
    <AppContext.Provider>
      <RootContainer />
    </AppContext.Provider>
    // <UserCenter></UserCenter>
    // <UserInfo></UserInfo>
  );
}

export default App;
