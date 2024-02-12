import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';

import { MovieReview } from 'types/MovieReview';
import { requestBackend } from 'util/requests';

import './styles.css';
import MovieReviews from 'components/MovieReviews';
import { useForm } from 'react-hook-form';
import { hasAnyRoles } from 'util/auth';

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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

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
      <h1>Tela detalhes do filme: {movieId}</h1>
      { hasAnyRoles(['ROLE_MEMBER']) && (
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
              <button type="submit" className="btn btn-primary search-button">
                SALVAR ALTERAÇÃO
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
