import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './util/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Doc from './pages/Doc';
import Search from './pages/Search';

const Other = () => {
  return <div className="w-full min-h-screen bg-blue-400">hello</div>;
};

const App = () => {
  const [logged] = useAuth();

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (logged ? <Dashboard /> : <Home />)}
        />
        <Route
          exact
          path="/login"
          render={() => (logged ? <Redirect to="/" /> : <Login />)}
        />
        <PrivateRoute exact path="/doc/:id" component={Doc} />
        <PrivateRoute exact path="/search/:term" component={Search} />
        <Route exact path="/404" component={Other} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
