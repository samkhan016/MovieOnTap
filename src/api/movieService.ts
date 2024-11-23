import {API_KEY} from '@env';
import {store} from '../redux/app/store';
import {setLoaderVisible} from '../redux/features/authSlice';
import axiosInstance from './axiosConfig';

const API_CATEGORIES = `/genre/movie/list?`;
const API_CATEGORY_IMG = `/discover/movie?`;
const API_UPCOMING = `/movie/upcoming?`;
const API_MOVIE_DETAIL = `/movie/`;
const API_SEARCH_MOVIE = '/search/movie?';

const params = new URLSearchParams();
params.append('api_key', API_KEY);
console.log({API_KEY});

const getCategories = async () => {
  try {
    store.dispatch(setLoaderVisible(true));
    const response = await axiosInstance.get(API_CATEGORIES + params);
    return response.data;
  } finally {
    store.dispatch(setLoaderVisible(false));
  }
};

const getCategoryImages = async (_id: string, pageNo: number) => {
  params.append('page', pageNo.toString());
  params.append('with_genres', _id);

  try {
    store.dispatch(setLoaderVisible(true));
    const response = await axiosInstance.get(API_CATEGORY_IMG + params);
    return response.data;
  } finally {
    store.dispatch(setLoaderVisible(false));
  }
};

const getMovies = async (pageNo: number) => {
  params.append('page', pageNo.toString());

  try {
    store.dispatch(setLoaderVisible(true));
    const response = await axiosInstance.get(API_UPCOMING + params);
    return response.data;
  } finally {
    store.dispatch(setLoaderVisible(false));
  }
};

const getMovieDetails = async (id: string) => {
  try {
    store.dispatch(setLoaderVisible(true));
    const response = await axiosInstance.get(
      `${API_MOVIE_DETAIL}${id}?${params}`,
    );
    return response.data;
  } finally {
    store.dispatch(setLoaderVisible(false));
  }
};

const getMovieTrailer = async (id: string) => {
  try {
    store.dispatch(setLoaderVisible(true));
    const response = await axiosInstance.get(
      `${API_MOVIE_DETAIL}${id}/videos?${params}`,
    );
    return response.data;
  } finally {
    store.dispatch(setLoaderVisible(false));
  }
};

const searchMovies = async (movieName: string) => {
  try {
    params.append('query', movieName);
    store.dispatch(setLoaderVisible(true));
    const response = await axiosInstance.get(`${API_SEARCH_MOVIE}${params}`);
    return response.data;
  } finally {
    store.dispatch(setLoaderVisible(false));
  }
};

const MovieService = {
  getCategories,
  getCategoryImages,
  getMovies,
  getMovieDetails,
  getMovieTrailer,
  searchMovies,
};
export default MovieService;
