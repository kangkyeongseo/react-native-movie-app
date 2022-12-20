const API_KEY = "9520e45017ba3d61c3cbf0b7230ba3f7";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Tv {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: object;
  id: number;
  name: string;
  origin_country: object;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const moviesApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: ({ pageParams = 1 }) =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParams}&region=KR`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((res) => res.json()),
  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  airingToday: ({ pageParams = 1 }) =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${pageParams}`
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json()),
  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
