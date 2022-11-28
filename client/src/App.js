import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import DetailCard from './components/DetailCard';
import AllActivities from './components/AllActivities';
import CreateActivity from './components/CreateActivity';

function App() {
  const {navBarActive, actualPage} = useSelector(state=>state)
  return (
    <div className="App">
      {navBarActive ? <div> <NavBar /> </div> : null}
      <Switch>
        <Route exact path='/'><LandingPage /></Route>
        <Route exact path={`/home/${actualPage}`}> <Home /> </Route>
        <Route exact path={`/detail/:id`}> <DetailCard/> </Route>
        <Route exact path={`/allActivities`}><AllActivities/></Route>
        <Route exact path={'/addActivity'}><CreateActivity/></Route>
        <Route path='*'>
          <Redirect to={`/home/${actualPage}`} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
