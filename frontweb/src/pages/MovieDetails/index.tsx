import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';

import { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { MovieReview } from 'types/MovieReview';
import { BASE_URL, requestBackend } from 'util/requests';

import './styles.css';
import MovieReviews from 'components/MovieReviews';
import { useForm } from 'react-hook-form';
import { hasAnyRoles } from 'util/auth';
import { Movie } from 'types/Movie';

type Props = {
  movieId: string;
};

type FormData = {
  movieId: number;
  text: string;
};

const MovieDetails = () => {
  const [movieReview, setMovieReview] = useState<MovieReview[]>([]);
  const { movieId } = useParams<Props>();
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `${BASE_URL}/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setMovie(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    setIsLoading(true);
    formData.movieId = parseInt(movieId);

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: `/reviews`,
      data: formData,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setValue('text', '');
        handleInsertReviews(response.data);
        setHasError(false);
      })
      .catch((error) => {
        console.log('Erro ao salvar', error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setMovieReview(response.data);
    });
  }, [movieId]);

  const handleInsertReviews = (review: MovieReview) => {
    const clone = [...movieReview];
    clone.push(review);
    setMovieReview(clone);
  };

  return (
    <div className="container">
      <Link to="/movies">
        <div className="goback-container arrow ">
          <ArrowIcon />
          <h2 className="text-white">VOLTAR</h2>
        </div>
      </Link>
      {movie && (
        <div className="base-card movie-detail-movie-card">
          <div className="movie-detail-top-container">
            <img src={movie.imgUrl} alt={movie.title} />
          </div>
          <div className="movie-detail-bottom-container">
            <h6>{movie.title}</h6>
            <h5>{movie.year}</h5>
            <h4>{movie.subTitle}</h4>
            <div className="movie-detail-card-bottom-container">
              <h3>{movie.synopsis}</h3>
            </div>
          </div>
        </div>
      )}

      {hasAnyRoles(['ROLE_MEMBER']) && (
        <div className="search-container base-card">
          {errors.text && (
            <div className="alert alert-danger">Campo obrigatório</div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="search-content">
              <input
                {...register('text', {
                  required: 'Campo obrigatório',
                })}
                className={`form-control base-input inputbar-container ${
                  errors.text ? 'is-invalid' : ''
                }`}
                type="text"
                placeholder="Deixe sua avaliação aqui"
                name="text"
              />
              <button
                type="submit"
                className="btn btn-primary movie-detail-search-button"
              >
                SALVAR AVALIAÇÃO
              </button>
            </div>
          </form>
        </div>
      )}
      {!isLoading ? (
        <div className="result-container  base-card">
          {movieReview &&
            movieReview.map((item) => <MovieReviews movieReview={item} />)}
        </div>
      ) : (
        <div className="result-container  base-card"></div>
      )}
    </div>
  );
};

export default MovieDetails;
