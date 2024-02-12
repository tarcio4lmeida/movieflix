import { MovieReview } from 'types/MovieReview';

import './styles.css';

import { ReactComponent as Star } from 'assets/images/star.svg';

type Props = {
  movieReview: MovieReview;
};

const MovieReviews = ({ movieReview }: Props) => {
  return (
    <div className="product-card">
      <div className="card-top-container">
        <Star/>
        <h6>{movieReview.user.name}</h6>
      </div>
      <div className="card-bottom-container">
        <h6>{movieReview.text}</h6>
      </div>
    </div>
  );
};

export default MovieReviews;
