import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DailyEvents from './components/Report2';
import HourlyEvents from './components/Report3';
import DailyStats from './components/Report4';
import HourlyStats from './components/Report1';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route exact path="/eventsHourly">
              <HourlyEvents />
            </Route>
            <Route exact path="/eventsDaily">
              <DailyEvents />
            </Route>
            <Route exact path="/statsHourly">
              <HourlyStats />
            </Route>
            <Route exact path="/statsDaily">
              <DailyStats />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
