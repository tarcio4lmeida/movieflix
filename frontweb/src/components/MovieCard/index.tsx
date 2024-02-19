import './styles.css';

import { Movie } from 'types/Movie';

type Props = {
    movie: Movie;
}

const MovieCard = ( { movie } : Props) => {

    return (
        <div className="base-card movie-card">
            <div className="movie-top-container">
                <img src={movie.imgUrl} alt={movie.title} />
            </div>
            <div className="movie-bottom-container">
                <h6>{movie.title}</h6>
                <h5>{movie.year}</h5>
                <h4>{movie.subTitle}</h4>   
            </div>
        </div>
    );
}

export default MovieCard;