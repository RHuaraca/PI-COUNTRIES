import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';

function App() {
  const {navBarActive, actualPage} = useSelector(state=>state)
  return (
    <div className="App">
      {navBarActive ? <div> <NavBar /> </div> : null}
      <Switch>
        <Route exact path='/'><LandingPage /></Route>
        <Route path={`/home/${actualPage}`}> <Home /> </Route>
        <Redirect to={`/home/${actualPage}`}/>
      </Switch>
    </div>
  );
}

export default App;
