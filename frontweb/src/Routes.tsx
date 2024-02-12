import { Router, Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import MovieCatalog from 'pages/MovieCatalog';
import history from 'util/history';
import PrivateRoute from 'components/PrivateRoute';
import MovieDetails from 'pages/MovieDetails';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies">
        <Route path="/movies" exact>
          <MovieCatalog />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
