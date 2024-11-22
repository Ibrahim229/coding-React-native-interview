
const API_KEY = "4879a650073fcd792105b130f81fe478";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
}

export const fetchMovies = async (): Promise<Movie[]> => {
  const endpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results;
};
