/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights:
 * Version:
 * Description: Main App Loading Registry Component
 * Date: 21-07-2020
 */

import * as React from 'react';
import AppContainer from '../routes/AppContainer';

/* 
NOTE
importing redux packages
Redux is not using in this application 
*/
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

console.disableYellowBox = true; //Disable yellow box
class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
