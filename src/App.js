import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import { LandingPage } from './Components/LandingPage';
import Clients from './Components/Clients';
import Booking from './Components/Booking';
import Appartements from './Components/Appartements';

function App() {
  return (
    <>
    <BrowserRouter> 
    <Switch> 
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/appartements" component={Appartements} />
      <Route exact path="/clients" component={Clients} />
      <Route exact path="/reservation" component={Booking} />
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
