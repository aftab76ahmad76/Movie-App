import { Route, Switch, Redirect } from 'react-router';
import './App.css';
import Movies from './components/Movies';
import Navbar from './components/Navigation';
import Rentals from './components/Rentals'
import Customers from './components/Customers';
import NotFound from './components/NotFound';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import NewMovie from './components/NewMovie';

function App() {
  return (
    <main >
      <Navbar />
      <div className="container my-4">
        <Switch>
          <Route path={'/login'} component={LoginForm} />
          <Route path={'/registration'} component={RegistrationForm} />
          <Route path={'/movieform/:id'} component={MovieForm} />
          <Route path={'/customers'} component={Customers} />
          <Route path={'/rentals'} component={Rentals} />
          <Route path={'/not-found'} component={NotFound} />
          <Route path={'/movies/new'} component={NewMovie} />
          <Route path={'/movies'} exact component={Movies} />
          <Redirect from={'/'} exact to={'/movies'} />
          <Redirect to={'/not-found'} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
