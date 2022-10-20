import { StatusBar } from 'expo-status-bar';
import Home from './src/components/Home';
import Navbar from './src/components/Navbar';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NativeRouter, Route, Routes } from 'react-router-native';
import CityDetail from './src/components/CityDetail';

export default function App() {
  return (
    <Provider store={store} >
      <NativeRouter>
        <StatusBar style='light'/>
        <Routes>
          <Route path='/' index element={ <Home /> }/>
          <Route path='detail' element={ <Navbar /> }>
            <Route path=':id' element={<CityDetail />}/>
          </Route>
        </Routes>
      </NativeRouter>
    </Provider>
  );
}
