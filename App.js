import { StatusBar } from 'expo-status-bar';
import Home from './src/components/Home';
import Navbar from './src/components/Navbar';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { NativeRouter, Route, Routes } from 'react-router-native';
import CityDetail from './src/components/CityDetail';
import Index from './src/components/Index';
import About from './src/components/About';

export default function App() {

  return (
    <Provider store={store} >
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor} >
        <NativeRouter>
          <StatusBar style='light'/>
          <Routes>
            <Route path='/' element={<Index />} >
              <Route path='detail' element={ <Navbar /> }>
                <Route path=':id' element={<CityDetail />}/>
              </Route>
              <Route index element={ <Home /> }/>
              <Route path='about' element={<About />} />
            </Route>
          </Routes>
        </NativeRouter>
      </PersistGate>
    </Provider>
  );
}
