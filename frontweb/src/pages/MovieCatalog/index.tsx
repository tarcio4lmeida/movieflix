import { Link } from 'react-router-dom';
import './styles.css';

const MovieCatalog = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-lg-4 col-xl-4">
          <Link to="/movies/1">
            <h1>filme 1</h1>
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-4">
          <Link to="/movies/2">
            <h1>filme 2</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCatalog;
