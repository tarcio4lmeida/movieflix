import { useParams } from 'react-router-dom';

import './styles.css';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  return (
    <div className="container">
      <h1>Tela detalhes do filme: {movieId}</h1>
      <div className="search-container base-card">
        <div className="search-content">
          <input
            className="inputbar-container"
            type="text"
            placeholder="Deixe sua avaliação aqui"
          />
          <button type="submit" className="btn btn-primary search-button">
            SALVAR ALTERAÇÃO
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-lg-4 col-xl-4"></div>
      </div>
    </div>
  );
};

export default MovieDetails;
